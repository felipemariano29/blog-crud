const sequelize = require("sequelize");

const connection = new sequelize("blogcrud", "root", process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
