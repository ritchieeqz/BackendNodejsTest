const jwt = require('jsonwebtoken');
const db = require("../models");
const usersLoginModel = db.usersLogin;

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (token == null){
    return res.status(401).send({
        success: false,
        message: 'Unauthorized access',
        data:'Please enter access token!'
      });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
    if (err){
        return res.status(401).send({
            success: false,
            message: 'Unauthorized access',
            data: 'Invalid access token!'
          });
    }
            
    if (payload){
        const login = await usersLoginModel.findOne({where:{ user_id : payload.user_id, token_id: payload.token_id}});

        var ipCurrent = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         req.connection.socket.remoteAddress

        var deviceCurrent = req.headers["user-agent"]

        if (login.device != deviceCurrent || login.ip_address != ipCurrent){
            return res.status(401).send({
                success: false,
                message: 'Unauthorized access',
                data: 'Not allow to use this access token!'
              });
        }

    }   
            req.user = payload;
            next();
  });
     

}

module.exports = authenticateToken
