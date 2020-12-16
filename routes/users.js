const usersRouter = require ('express').Router();
const asyncHandler = require('express-async-handler');
const { handleAllUsers, handleAnUser, handleOneUserCreation, handleOneUserDeletion, handleOneUserUpdate } = require ('../controllers/users')

usersRouter.get('/', asyncHandler(handleAllUsers)); // get all users
usersRouter.get('/:id', asyncHandler(handleAnUser)); // get one user
usersRouter.delete('/:id', asyncHandler(handleOneUserDeletion)); // delete one user
usersRouter.post('/', asyncHandler(handleOneUserCreation)); // create one user
usersRouter.put('/:id', asyncHandler(handleOneUserUpdate)) // update one user

module.exports = usersRouter;