require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const port = 8082;

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
    console.log("Conexão com banco de dados feita com sucesso");
  })
  .catch((err) => {
    console.log("Erro no banco de dados: " + err);
  });

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log("Rodando na porta: " + port);
});
