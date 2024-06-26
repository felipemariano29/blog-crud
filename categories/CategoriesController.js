const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");
const adminAuth = require("../middlewares/adminAuth");

router.get("/admin/categories/new", adminAuth, (req, res) => {
  res.render("admin/categories/new");
});

router.post("/categories/save", (req, res) => {
  const title = req.body.title;

  if (title !== undefined) {
    Category.create({
      title: title,
      slug: slugify(title, { lower: true }),
    }).then(() => {
      res.redirect("/admin/categories");
    });
  } else {
    res.redirect("/admin/categories/new");
  }
});

router.get("/admin/categories", adminAuth, (req, res) => {
  Category.findAll()
    .then((categories) => {
      res.render("admin/categories/index", {
        categories: categories,
      });
    })
    .catch((err) => {
      res.redirect("/");
    });
});

router.post("/categories/delete", (req, res) => {
  const id = req.body.id;

  if (id !== undefined && !isNaN(id)) {
    Category.destroy({
      where: {
        id: id,
      },
    })
      .then(() => {
        res.redirect("/admin/categories");
      })
      .catch((err) => {
        console.log("Error while deleting category: " + err);
        res.redirect("/admin/categories");
      });
  } else {
    res.redirect("/admin/categories");
  }
});

router.get("/admin/categories/edit/:id", adminAuth, (req, res) => {
  const id = req.params.id;

  if (id !== undefined && !isNaN(id)) {
    Category.findByPk(id)
      .then((category) => {
        if (category !== undefined) {
          res.render("admin/categories/edit", { category: category });
        } else {
          res.redirect("/admin/categories");
        }
      })
      .catch((err) => {
        console.log("Error while editing category: " + err);
        res.redirect("/admin/categories");
      });
  } else {
    res.redirect("/admin/categories");
  }
});

router.post("/categories/update", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;

  Category.update(
    { title: title, slug: slugify(title, { lower: true }) },
    { where: { id: id } }
  )
    .then(() => {
      res.redirect("/admin/categories");
    })
    .catch((err) => {
      console.log("Error while updating category: " + err);
      res.redirect("/admin/categories");
    });
});

module.exports = router;
