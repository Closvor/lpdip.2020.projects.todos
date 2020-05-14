'use strict';

const express = require(`express`);
const todos = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'serveur-mysql',
  user: 'root',
  password :'',
  port : 3306,
  database: 'lpdip01'
});

todos.get(`/`, async (req, res) => {

  let sql = "SELECT * FROM `todos`";

  connection.query(sql, function(error, results, fields) {
      return res.json(results);
  });
});

todos.post('/', async (req, res) => {
  let todo = {
    label: req.body.label,
    idList: req.body.idList
  }

  let sql = "INSERT INTO `todos`(`label`, `idList`) VALUES (?)";

  let values = [todo.label, todo.idList];

  connection.query(sql, [values], function(error, results, fields) {
      if (error) {
          throw error;
      }else{
        let response = "SELECT * FROM `todos` where id = (SELECT MAX(id) FROM `todos`)";
        connection.query(response, function(error, results, fields) {
          return res.json(results);
        });
      }
  });

});

todos.put('/:id', async (req, res) => {

  let todoId = req.params.id;
  let todo = {
    label: req.body.label,
    idList: req.body.idList,
    isDone: req.body.isDone
  }
  let sql = "UPDATE todos set label = ? , isDone = ? , idList = ?  where id = ?";

  let values = [todo.label, todo.isDone, todo.idList, todoId];

  connection.query(sql, values,
      function(error, results, fields) {
      if (error) {
          throw error;
      }else{
        let response = "SELECT * FROM `todos` where id = ?";
        let value = [todoId];
        connection.query(response, [value], function(error, results, fields) {
          return res.json(results);
        });
      }
  });
});

todos.delete('/:id', async (req, res) => {

  let todoId = req.params.id;

  let sql = "DELETE from `todos` where id= ?";

  let value = [todoId];

  connection.query(sql, [value], function(error, results, fields) {
      if (error) {
          throw error;
      }
  });

});
module.exports = todos;
