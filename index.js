// Imports
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const port = 8081;

// Controllers
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

// Models
const Category = require("./categories/Category");
const Article = require("./articles/Article");

// View engine
app.set("view engine", "ejs");

// Static
app.use(express.static("public"));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database
connection
  .authenticate()
  .then(() => {
    console.log("Database connected with success!");
  })
  .catch((err) => {
    console.log("Error on database: " + err);
  });

// Routes
app.use("/", categoriesController);

app.use("/", articlesController);

app.get("/", (req, res) => {
  Article.findAll({
    order: [["id", "DESC"]],
  })
    .then((articles) => {
      Category.findAll().then((categories) => {
        res.render("index", { articles: articles, categories: categories });
      });
    })
    .catch((err) => {
      console.log("Error while listing articles: " + err);
      res.redirect("/");
    });
});

app.get("/:slug", (req, res) => {
  const slug = req.params.slug;

  Article.findOne({
    where: {
      slug: slug,
    },
  })
    .then((article) => {
      if (article != undefined) {
        Category.findAll().then((categories) => {
          res.render("article", { article: article, categories: categories });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      console.log("Error while listing articles: " + err);
      res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
  const slug = req.params.slug;

  Category.findOne({
    where: {
      slug: slug,
    },
    include: [{ model: Article }],
  })
    .then((category) => {
      if (category != undefined) {
        Category.findAll().then((categories) => {
          res.render("index", {
            articles: category.articles,
            categories: categories,
          });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      console.log("Error while listing articles: " + err);
      res.redirect("/");
    });
});

app.listen(port, () => console.log("Running on port: " + port));
