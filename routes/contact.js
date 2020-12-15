const asyncHandler = require('express-async-handler');
const contactRouter = require('express').Router();
const { handleOneContactPost } = require('../controllers/contact');

contactRouter.post('/', asyncHandler(handleOneContactPost)); 

module.exports = contactRouter;
