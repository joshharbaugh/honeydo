'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Todo = mongoose.model('Todo'),
    passport = require('passport');

/**
 * Create user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.save(function(err) {
    if (err) return res.json(400, err);
    
    req.logIn(newUser, function(err) {
      if (err) return next(err);

      return res.json(req.user.userInfo);
    });
  });
};

/**
 *  Get profile of specified user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(404);

    res.send({ profile: user.profile });
  });
};

/**
 *  Get profile of all users
 */
exports.list = function (req, res, next) {
  var userId = req.params.id;

  User.find({}).sort('name').exec(function (err, users) {
    if (err) return next(err);
    if (!users) return res.send(404);

    res.json(200, users);
  });
};

/**
 * Change password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.query.oldPassword);
  var newPass = String(req.query.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return res.send(400);

        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

exports.changeEmail = function(req, res, next) {
  var userId = req.user._id;
  var email = String(req.query.email);

  User.findById(userId, function (err, user) {
    user.email = email;
    user.save(function(err) {
      if (err) return res.send(400);

      res.json(200, {email: user.email, name: user.name, _id: user._id});
    });
  });  
};

/**
 * Get current user
 */
exports.me = function(req, res) {
  res.json(req.user || null);
};

/**
 * Get current user's todos
 */
exports.todos = function(req, res, next) {
  var userId = req.user._id;

  User.findById(userId, function (err, user) {
    if(!err) return res.json(user.todos);
    else return res.send(500, err);
  });
};

exports.createTodo = function(req, res, next) {
  var userId = req.user._id;

  User.findById(userId, function (err, user) {
    if(err) return res.send(500, err);

    user.todos.push(new Todo(req.body));
    user.save(function(err) {
      if (err) return res.send(400);

      res.json(200, user);
    });
  });

};

exports.updateTodos = function(req, res, next) {
    var userId = req.user._id;
    var todoId = req.body._id;

    User.findById(userId, function (err, user) {
      if(err) return res.send(500, err);

      var todo = user.todos.id(todoId);
      todo.name = req.body.name;
      todo.info = req.body.info;
      
      user.save(function(err) {
        if(err) return res.send(500, err);
        
        res.json(200, todo);
      });
    });
};

exports.deleteTodo = function(req, res, next) {
    var userId = req.user._id;
    var todoId = req.query._id;

    User.findById(userId, function (err, user) {
      if(err) return res.send(500, err);

      var todo = user.todos.id(todoId).remove();
      
      user.save(function(err) {
        if(err) return res.send(500, err);
        
        res.json(200, {'success': 'ok'});
      });
    });
};