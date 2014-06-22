'use strict';

var index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    twilio = require('./controllers/twilio'),
    middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  /** 
   * Server API Routes
   */

  // User routes
  app.route('/api/users')
    .get(middleware.auth, users.list)
    .post(users.create)
    .put(users.changePassword);
  app.route('/api/users/me')
    .get(middleware.auth, users.me)
    .put(middleware.auth, users.changeEmail);
  app.route('/api/users/me/todos')
    .get(middleware.auth, users.todos)
    .post(middleware.auth, users.createTodo)
    .put(middleware.auth, users.updateTodos)
    .delete(middleware.auth, users.deleteTodo);
  app.route('/api/users/:id')
    .get(middleware.auth, users.show);

  // Session routes
  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);

  // SMS routes
  app.route('/api/send')
    .post(middleware.auth, twilio.createSMS);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( middleware.setUserCookie, index.index);
};