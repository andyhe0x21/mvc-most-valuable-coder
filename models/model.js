
"use strict";

(function() {
  // import npm module
  var Sequelize = require("sequelize");

  // configure sequelize instance
  // be sure to run mysql command to create database instance
  var password = "";
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
  var User = sequelize.define("table_name",
  {
    name: {
      type: Sequelize.STRING
    }, 
     num_solved: {
      type: Sequelize.INTEGER
    },
     avg_time: {
      type: Sequelize.FLOAT
    },
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
   
    add: function(newName, callback) {
      myTable.create({
      
        name: newName
      }).then(function(result) {
        callback(result);
      });
    },
    update: function(itemId, callback) {
      myTable.update(
      {
        
      }
      , {
        where: 
        {
          
        }
      }).then(function (result) {
        callback(result);
      })
    }
  };

  // export model to controller
  module.exports = model;
})();