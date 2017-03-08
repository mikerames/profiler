var express = require('express');
//var router = express.Router();
var mongoose = require('mongoose');
var Todo = require('./models/promotions');
var Dishes = require('./models/dishes');
var Profiles = require('./models/profiles');

function getProfiles(res) {
    Profiles.find(function (err, post) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(post); // return all todos in JSON format
    });
};


function getPromotions(res) {
    Dishes.find(function (err, post) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(post); // return all todos in JSON format
    });
};

/*
function getPromotionsById(res) {
    console.log('getPromotionsById');

    //Todo.findById('58b3694461296a7cfc7ab739', function (err, post) {
    Todo.findById('58b74d2cf36d281facb7c53e', function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
};
*/


//middleware
module.exports = function (app, passport) {

    // api ---------------------------------------------------------------------

    //get profile
    app.get('/api/profiles/:id', function (req, res) {
        Profiles.findById(req.params.id, function (err, post) {
            console.log(req.params.id);
            if (err) return next(err);
            res.json(post);
        });
    });

// get all profiles
app.get('/api/profiles/', function (req, res) {
    // use mongoose to get all profiles in the database
    getProfiles(res);
});


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

//authentication


app.get('/index_login', function(req, res) {
		res.render('/app/views/index_login.html'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.html', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/#/tst', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('/app/views/signup.html', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		//successRedirect : '/profile', // redirect to the secure profile section
        successRedirect : '/views/index_login.html', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('/views/profiles.html', {
			user : req.user // get the user out of session and pass to template
		});
	});

	app.get('/tst', isLoggedIn, function(req, res) {
		res.render('/views/tst.html', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
};



