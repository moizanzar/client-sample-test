'use strict';
let Sequelize = require('sequelize');
let fs = require('fs');
let path = require('path');
let dbInfo = require('../config/config.js').getConfig();
let basename  = path.basename(__filename);

const env       = process.env.APP_ENV || 'development';
const config = dbInfo[env];

let db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;