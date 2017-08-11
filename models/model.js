
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
    sequelize = new Sequelize("mvc_db", "root", "andyhemysql123", {
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
  var users = sequelize.define("users",
  {
    name: {
      type: Sequelize.STRING
    }, 
    problem_0_time: {
      type: Sequelize.INTEGER
    },
    problem_1_time: {
      type: Sequelize.INTEGER
    },
    problem_2_time: {
      type: Sequelize.INTEGER
    },
    problem_3_time: {
      type: Sequelize.INTEGER
    }
  },

  {
    timestamps: false
  });

  // sync table
  users.sync();

  // combined model and ORM
  var model = {
    all: function(callback) {
      users.sync(); // make sure table "users" has already existed
      users.findAll({// empty constraint
      }).then(function(result) {
        callback(result);
      });
    },
    searchUser: function(name, callback) {
      users.sync(); // make sure table "users" has already existed
      users.findAll({
        where:
        {
          name: name
        }
      }).then(function(result) {
        callback(result);
      });
    },

    searchTopUsersForProblem: function(problemId, callback) {
      users.sync(); // make sure table "users" has already existed
      var problemIdInt = parseInt(problemId); // integer passed by frontend is string
      switch(problemIdInt) {
        case 0: {
          users.findAll({
            order: [["problem_0_time", "ASC"]],
            limit: 3
          }).then(function(result) {
            callback(result);
          });
          break;
        }
        case 1: {
          users.findAll({
            order: [["problem_1_time", "ASC"]],
            limit: 3
          }).then(function(result) {
            callback(result);
          });
          break;
        }
        case 2: {
          users.findAll({
            order: [["problem_2_time", "ASC"]],
            limit: 3
          }).then(function(result) {
            callback(result);
          });
          break;
        }
        case 3: {
          users.findAll({
            order: [["problem_3_time", "ASC"]],
            limit: 3
          }).then(function(result) {
            callback(result);
          });
          break;
        }
        default: {
          console.log("Should not be called. Please check.");
        }
      }
    },

    add: function(userName, callback) {
      users.sync(); // make sure table "users" has already existed
      users.create({
        name: userName,
        problem_0_time: 999999,
        problem_1_time: 999999,
        problem_2_time: 999999,
        problem_3_time: 999999

      }).then(function(result) {
        callback(result);
      });
    },
    update: function(userName, problemId, time, callback) {

      var problemIdInt = parseInt(problemId); // integer passed by frontend is string
      var timeInt = parseInt(time); // integer passed by frontend is string

      var updateObject;

      users.sync(); // make sure table "users" has already existed
      
      console.log("problem id is " + problemIdInt);
      switch(problemIdInt) {
        case 0: {
          updateObject = {
            problem_0_time: timeInt
          }
          console.log("Setting time for problem 0: " + time);
          break;
        }
        case 1: {
          updateObject = {
            problem_1_time: timeInt
          }
          break;
        }
        case 2: {
          updateObject = {
            problem_2_time: timeInt
          }
          console.log("Setting time for problem 0: " + time);
          break;
        }
        case 3: {
          updateObject = {
            problem_3_time: timeInt
          }
          break;
        }
        default: {
          console.log("Wrong problem ID in update().");
        }
      }
      console.log("Object to be updated is " + updateObject);
      users.update(updateObject, {where: {name: userName}}).then(function (result) {
        callback(result);
      });
    }
  };

  // export model to controller
  module.exports = model;
})();