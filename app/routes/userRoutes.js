const authenticate = require('../middlewares/authenticate');

module.exports = app => {
  const userController = require("../controllers/usersController.js");

  var router = require("express").Router();

  router.post("/create", userController.create);

  router.post("/login", userController.login);

  router.post("/logout", authenticate, userController.logout);

  app.use('/api/user', router);
};
