'use strict';

const express = require(`express`);
const lists = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'serveur-mysql',
  user: 'root',
  password :'',
  port : 3306,
  database: 'lpdip01'
});

lists.get(`/`, async (req, res) => {

  let sql = "SELECT * FROM `lists`";

  connection.query(sql, function(error, results, fields) {
      return res.json(results);
  });
});

lists.post('/', async (req, res) => {
  let todo = {
    label: req.body.label,
    description: req.body.description
  }

  let sql = "INSERT INTO `lists`(`label`, `description`) VALUES (?)";

  let values = [todo.label, todo.description];

  connection.query(sql, [values], function(error, results, fields) {
      if (error) {
          throw error;
      }else{
        let response = "SELECT * FROM `lists` where id = (SELECT MAX(id) FROM `lists`)";
        connection.query(response, function(error, results, fields) {
          return res.json(results);
        });
      }
  });

});

lists.put('/:id', async (req, res) => {

  let todoId = req.params.id;
  let todo = {
    label: req.body.label,
    description: req.body.description
  }
  let sql = "UPDATE lists set label = ? , description = ?  where id = ?";

  let values = [todo.label, todo.description, todoId];

  connection.query(sql, values,
      function(error, results, fields) {
      if (error) {
          throw error;
      }else{
        let response = "SELECT * FROM `lists` where id = ?";
        let value = [todoId];
        connection.query(response, [value], function(error, results, fields) {
          return res.json(results);
        });
      }
  });
});

module.exports = lists;
