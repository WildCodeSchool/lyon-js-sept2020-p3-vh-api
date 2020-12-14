const usersRouter = require ('express').Router();
const asyncHandler = require('express-async-handler');
const { handleAllUsers, handleAnUser, handleOneUserCreation, handleOneUserDeletion, handleOneUserUpdate } = require ('../controllers/users')

usersRouter.get('/', handleAllUsers); // get all users
usersRouter.get('/:id', handleAnUser); // get one user
usersRouter.delete('/:id', handleOneUserDeletion); // delete one user
usersRouter.post('/', asyncHandler(handleOneUserCreation)); // create one user
usersRouter.put(':id', handleOneUserUpdate) // update one user

module.exports = usersRouter;