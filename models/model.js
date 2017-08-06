
"use strict";

(function() {
  // import npm module
  var Sequelize = require("sequelize");

  // configure sequelize instance
  // be sure to run mysql command to create database instance

  var sequelize;
  if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize("b0d3jc6zlw954h1y", "hlkowtni85aihv45", "oxuw49geqe12bw4t", {
      host: "op2hpcwcbxb1t4z9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    });
  }
  else {
    sequelize = new Sequelize("burger_db", "root", "andyhemysql123", {
      host: "localhost",
      dialect: "mysql",
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    });
  }

  // define table structure
  var user_table = sequelize.define("user_table",
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
  user_table.sync();

  // combined model and ORM
  var model = {
    all: function(callback) {
      user_table.findAll({// empty constraint
      }).then(function(result) {
        callback(result);
      });
    },
    search: function(name, callback) {
      user_table.findAll({
        where:
        {
          name: name
        }
      }).then(function(result) {
        callback(result);
      });
    },
   
    add: function(newName, callback) {
      user_table.create({
      
        name: newName
      }).then(function(result) {
        callback(result);
      });
    },
    update: function(itemId, callback) {
      user_table.update(
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