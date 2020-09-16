const authenticate = require('../middlewares/authenticate');

module.exports = app => {
  const productController = require("../controllers/productController.js");

  var router = require("express").Router();

  router.post("/create", productController.create);

  router.get("/", productController.findAll);

  router.put("/:id", productController.update);

  router.delete("/:id", productController.delete);

  app.use('/api/product',authenticate, router);
};
