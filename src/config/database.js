const Sequelize = require('sequelize');

const db = process.env.DB;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize({
  database: db,
  username: user,
  password: password,
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
