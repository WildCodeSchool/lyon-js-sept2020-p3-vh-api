const addressRouter = require('express').Router();
const asyncHandler = require('express-async-handler');
const {handleAllAddress, handleCreateAddress, handleUpdateAddress, handleDeleteAddress} = require('../controllers/adress.js');
// const requireAdmin = require('../middlewares/requireAdmin.js');
const requireRequestBody = require('../middlewares/requireRequestBody.js');


addressRouter.get('/', asyncHandler(handleAllAddress));
addressRouter.post('/',requireRequestBody, asyncHandler(handleCreateAddress));
addressRouter.put('/:id',requireRequestBody,asyncHandler(handleUpdateAddress));
addressRouter.delete('/:id', asyncHandler(handleDeleteAddress));

module.exports = addressRouter;