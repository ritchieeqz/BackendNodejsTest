const db = require("../models");
const productModel = db.products;
const Op = db.Sequelize.Op;
const validator = require('../helpers/validate');

// Create Product
exports.create = (req, res) => {

  // Validate request
  var validateStatus = null;

  const validationRule = {
    "product_no": "string",
    "product_name": "required|string",
    "product_price": "required|numeric",
    "product_description": "string",
  }

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
       
      validateStatus = err; 
    }
  });

  if (validateStatus != null) {

    res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: validateStatus
    });

    return;
  }

  const productInput = {
    product_no: req.body.product_no,
    product_name: req.body.product_name,
    price: req.body.product_price,
    description: req.body.product_description
  };

  productModel.create(productInput)
    .then(data => {
      res.status(201).send({
        success: true,
        message: 'Product has created.',
        data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product."
      });
    });
};

// get all product from the database.
exports.findAll = (req, res) => {

  productModel.findAll()
    .then(data => {
      res.status(200).send({
        success: true,
        message: 'Show all products.',
        data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Update
exports.update = (req, res) => {
  
  const id = req.params.id;

  // Validate request
  var validateStatus = null;

  const validationRule = {
    "product_no": "string",
    "product_name": "string",
    "product_price": "numeric",
    "product_description": "string",
  }

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
       
      validateStatus = err; 
    }
  });

  if (validateStatus != null) {

    res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: validateStatus
    });

    return;
  }

  const productInput = {
    product_no: req.body.product_no,
    product_name: req.body.product_name,
    price: req.body.product_price,
    description: req.body.product_description
  };
  
  productModel.update(productInput, {
    where: { product_id: id }
  })
    .then(status => {
      if (status == 1) {
        res.status(200).send({
          success: true,
          message: `Product id=${id} was updated successfully.`,
        });
      } else {
        res.status(200).send({
          message: `Cannot update product with id=${id}. Maybe product was not found or input is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating product with id=" + id
      });
    });
    
};

// Delete
exports.delete = (req, res) => {
  const id = req.params.id;

  productModel.destroy({
    where: { product_id: id }
  })
    .then(status => {
      if (status == 1) {
        res.status(200).send({
          message: `Product id=${id} was deleted successfully.`
        });
      } else {
        res.status(200).send({
          message: `Cannot delete product with id=${id}. Maybe product was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete product with id=" + id
      });
    });
    
};
