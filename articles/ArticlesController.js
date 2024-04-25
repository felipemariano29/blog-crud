const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

router.get("/admin/articles", (req, res) => {
  Article.findAll({
    include: [{ model: Category }],
  })
    .then((articles) => {
      res.render("admin/articles/index", { articles: articles });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/admin/articles");
    });
});

router.get("/admin/articles/new", (req, res) => {
  Category.findAll()
    .then((categories) => {
      res.render("admin/articles/new", { categories: categories });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/admin/articles/");
    });
});

router.post("/articles/save", (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const category = req.body.category;

  Article.create({
    title: title,
    slug: slugify(title, { lower: true }),
    body: body,
    categoryId: category,
  })
    .then(() => {
      res.redirect("/admin/articles");
    })
    .catch((err) => {
      console.log("Error while saving article: " + err);
      res.redirect("/admin/articles");
    });
});

router.post("/articles/delete", (req, res) => {
  const id = req.body.id;

  if (id !== undefined && !isNaN(id)) {
    Article.destroy({
      where: {
        id: id,
      },
    })
      .then(() => {
        res.redirect("/admin/articles");
      })
      .catch((err) => {
        console.log("Error while deleting article: " + err);
        res.redirect("/admin/articles");
      });
  } else {
    res.redirect("/admin/articles");
  }
});

module.exports = router;
