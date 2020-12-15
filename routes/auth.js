const authRouter = require ('express').Router();
const asyncHandler = require('express-async-handler');
const { login } = require ('../controllers/auth')

authRouter.post('/login', asyncHandler(login)); 


module.exports = authRouter;