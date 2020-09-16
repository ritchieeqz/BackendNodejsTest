const db = require("../models");
require('dotenv').config();
const userModel = db.users;
const usersLoginModel = db.usersLogin;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const customId = require('custom-id');
const validator = require('../helpers/validate');
const isEmpty = require('../helpers/emptycheck');

// Create user
exports.create = async (req, res) => {

  // Validate request
  var validateStatus = null;

  const validationRule = {
    "username": "required|string",
    "password": "required|string|confirmed",
    "password_confirmation": "required",
  }

  await validator(req.body, validationRule, {}, (err, status) => {
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
  
  const usernameInput = req.body.username;
  var currentUser = null;

  // check duplicate user
  await userModel.findAll({ where: { 
      username: usernameInput
    }})
    .then(data => {
      currentUser = data;
    })
    .catch(err => {
      res.status(500).send({
          success: false,
          message: 'user duplicate check failed',
          data: err || "Some error occurred while user duplicate check."
      });
  });

  if(isEmpty(currentUser) == true){

    var passwordHashed = await bcrypt.hash(req.body.password, 10)

    const userInput = {
      username: req.body.username,
      password: passwordHashed
    };

    await userModel.create(userInput)
    .then(data => {
      res.status(201).send({
        success: true,
        message: 'User has created.',
        data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating user."
      });
    });

  }else{

    res.status(200).send({
      success: false,
      message: 'User is duplicate.',
    });
  }
  
};


// Login
exports.login = async (req, res) => {
  var userData = null;

  await userModel.findOne({ where: { username: req.body.username } })
    .then(data => {
    
      if(!data){
        res.status(200).send({
          success: false,
          message: 'User not found.',
        });
      }else{

        userData = data;
      }

    })
    .catch(err => {
      res.status(500).send({
        message: err || "Some error occurred while login."
      });
    });

    var passwordMatch = await bcrypt.compare(req.body.password, userData.password);

    if(passwordMatch == true){

      var loginDuplicate = await usersLoginModel.findOne({ where: { user_id : userData.user_id, logged_out:0 } });
  
      if(loginDuplicate){
        return res.status(200).send({
          success: false,
          message: 'Login failed',
          data: 'Someone is using this account, not allow to multiple login!'
        });
        
      }

      var ipCurrent = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         req.connection.socket.remoteAddress

      const token_id = await customId({
        user_id : userData.user_id,
        date : Date.now(),
        randomLength: 4 
      });

      await usersLoginModel.create({
        user_id : userData.user_id,
        token_id : token_id,
        ip_address : ipCurrent ,
        device : req.headers["user-agent"]
    });

      const userDetailsToken = {
        user_id: userData.user_id,
        username: userData.username,
        token_id: token_id
      }
      var accessToken = jwt.sign(userDetailsToken, process.env.ACCESS_TOKEN_SECRET)

      res.status(200).send({
        success: true,
        message: 'Login successfuly.',
        data: userDetailsToken,
        accessToken: accessToken
      });
    }else{
      res.status(200).send({
        success: false,
        message: 'Sorry, the password you entered is incorrect. Please try again.',
      });
    }

};

// Logout
exports.logout = async (req, res) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
    const login = await usersLoginModel.findOne({where:{ user_id : payload.user_id, token_id: payload.token_id}});
    login.logged_out=true;
    await login.save();

    return res.status(200).send({
      success: true,
      message: 'logged out successfully.',
    });
  });

};