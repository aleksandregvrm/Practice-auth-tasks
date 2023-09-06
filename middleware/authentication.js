const UnauthenticatedError = require('../errors/unauthenticated');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
      throw new UnauthenticatedError('Authentication error, try again later...')
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        req.user = {userId:payload.userId,name:payload.name}
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = auth;