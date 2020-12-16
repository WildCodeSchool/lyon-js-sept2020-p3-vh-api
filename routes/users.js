const usersRouter = require ('express').Router();
const asyncHandler = require('express-async-handler');
const protectByApiKey = require('../middlewares/protectByEnvAPIKey');
const requireRequestBody = require('../middlewares/requireRequestBody.js');
const { handleAllUsers, handleAnUser, handleOneUserCreation, handleOneUserDeletion, handleOneUserUpdate } = require ('../controllers/users')

usersRouter.get('/', protectByApiKey, asyncHandler(handleAllUsers)); // get all users
usersRouter.get('/:id', protectByApiKey,asyncHandler(handleAnUser)); // get one user
usersRouter.delete('/:id', protectByApiKey,asyncHandler(handleOneUserDeletion)); // delete one user
usersRouter.post('/', protectByApiKey,requireRequestBody,asyncHandler(handleOneUserCreation)); // create one user
usersRouter.put('/:id', protectByApiKey,requireRequestBody,asyncHandler(handleOneUserUpdate)) // update one user

module.exports = usersRouter;