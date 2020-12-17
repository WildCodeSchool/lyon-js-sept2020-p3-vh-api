const asyncHandler = require('express-async-handler');
const contactRouter = require('express').Router();
const protectByApikey = require('../middlewares/protectByEnvApiKey')
const {handleGetAllMessages,handleGetOneMessage, handleOneMessagePost, handleDeleteOneMessage } = require('../controllers/contact');

contactRouter.get('/', protectByApikey, asyncHandler(handleGetAllMessages)); 
contactRouter.get('/:id', protectByApikey, asyncHandler(handleGetOneMessage)); 
contactRouter.post('/', protectByApikey, asyncHandler(handleOneMessagePost));
contactRouter.delete('/:id', protectByApikey, asyncHandler(handleDeleteOneMessage)); 

module.exports = contactRouter;
