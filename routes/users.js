const usersRouter = require ('express').Router();
const asyncHandler = require('express-async-handler');
const requireRequestBody = require('../middlewares/requireRequestBody.js');
const { handleAllUsers, handleAnUser, handleOneUserCreation, handleOneUserDeletion, handleOneUserUpdate } = require ('../controllers/users')

usersRouter.get('/',  asyncHandler(handleAllUsers)); // get all users
usersRouter.get('/:id',asyncHandler(handleAnUser)); // get one user
usersRouter.delete('/:id', asyncHandler(handleOneUserDeletion)); // delete one user
usersRouter.post('/', requireRequestBody,asyncHandler(handleOneUserCreation)); // create one user
usersRouter.put('/:id', requireRequestBody,asyncHandler(handleOneUserUpdate)); // update one user

module.exports = usersRouter;