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
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if (error) return res.json(401, error);

    var userId = req.params.id;

    User.findById(userId, function (err, user) {
      if (err) return next(err);
      if (!user) return res.send(404);

      res.send({ profile: user.profile });
    });

  })(req, res, next);
};

/**
 *  Get profile of all users
 */
exports.list = function (req, res, next) {
  var userId = req.params.id;

  User.find({}).select('-salt -hashedPassword').sort('name').exec(function (err, users) {
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

exports.deleteAccount = function(req, res, next) {
  // TODO
  res.send(200);
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
    
    var todo = req.body;
    todo.completed = false;
    todo.createdAt = new Date();

    user.todos.push(new Todo(todo));
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
      todo.completed = req.body.completed;
      todo.updatedAt = new Date();
      
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