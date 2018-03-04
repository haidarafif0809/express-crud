'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   var sequelize = new Sequelize(config.database, config.username, config.password, config);
// }
let database_url = "postgres://wtpiucmzhpiilm:2d67f5314e337eafdc7ecaa3660e5133677538fd277f7f6a8b37b162deb83b8a@ec2-54-243-31-34.compute-1.amazonaws.com:5432/ddhle7bodshsjm";

var sequelize = new Sequelize(database_url, {
                                    dialect: 'postgres',
                                    protocol: 'postgres',
                                    dialectOptions: {
                                        ssl: true
                                    }
                                });

fs
  .readdirSync(__dirname)
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
