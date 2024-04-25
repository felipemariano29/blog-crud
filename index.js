// Imports
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const port = 8080;

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

app.get("/", (req, res) => res.render("index"));

app.listen(port, () => console.log("Running on port: " + port));
