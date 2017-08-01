"use strict";

(function() {
  // import npm module
  var Sequelize = require("sequelize");

  // configure sequelize instance
  // be sure to run mysql command to create database instance
  var password = "andyhemysql123";
  var sequelize = new Sequelize("database_name", "root", password, {
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });

  // define table structure
  var myTable = sequelize.define("table_name",
  {
    name: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  });

  // sync table
  myTable.sync();

  // combined model and ORM
  var model = {
    all: function(callback) {
      myTable.findAll({// empty constraint
      }).then(function(result) {
        callback(result);
      });
    },
    search: function(name, callback) {
      myTable.findAll({
        where:
        {
          name: name
        }
      }).then(function(result) {
        callback(result);
      });
    },
    deleteById: function(itemId, callback) {
      myTable.destroy(
      {
        where: {
          id: itemId
        }
      }).then(function(result) {
        callback(result);
      });
    },
    add: function(newName, callback) {
      myTable.create({
        id: 1,
        name: newName
      }).then(function(result) {
        callback(result);
      });
    },
    update: function(itemId, callback) {
      myTable.update(
      {
        isDone: true
      }
      , {
        where: 
        {
          id: itemId
        }
      }).then(function (result) {
        callback(result);
      })
    }
  };

  // export model to controller
  module.exports = model;
})();