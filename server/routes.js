var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Todo = require('./models/promotions');
var Dishes = require('./models/dishes');


function getPromotions(res) {
    Dishes.find(function (err, post) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(post); // return all todos in JSON format
    });
};


function getPromotionsById(res) {
console.log('getPromotionsById');

  //Todo.findById('58b3694461296a7cfc7ab739', function (err, post) {
    Todo.findById('58b74d2cf36d281facb7c53e', function (err, post) {      
    if (err) return next(err);
    res.json(post);
  });
    
}

//middleware
module.exports = function (app) {

    // api ---------------------------------------------------------------------
    
   
    
    // get all todos
    app.get('/api/dishes/', function (req, res) {
        // use mongoose to get all todos in the database
        getPromotions(res);
    });

 app.get('/api/dishes/:id', function (req, res) {
        Dishes.findById(req.params.id, function (err, post) {

            console.log(req.params.id);

            if (err) return next(err);
            res.json(post);
        });
    });

app.get('/api/promotions/:id', function (req, res) {
    Todo.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            text1: req.body.text1,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        console.log(__dirname);
        res.sendFile(__dirname + '/app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};