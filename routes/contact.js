const asyncHandler = require('express-async-handler');
const contactRouter = require('express').Router();
const {handleGetAllMessages,handleGetOneMessage, handleOneMessagePost } = require('../controllers/contact');

contactRouter.get('/', asyncHandler(handleGetAllMessages)); 
contactRouter.get('/:id', asyncHandler(handleGetOneMessage)); 
contactRouter.post('/', asyncHandler(handleOneMessagePost)); 

module.exports = contactRouter;
