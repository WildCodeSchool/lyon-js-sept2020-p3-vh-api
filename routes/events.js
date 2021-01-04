const eventsRouter = require('express').Router();
const asyncHandler = require('express-async-handler');
const {handleAllEvents, handleCreateEvent, handleUpdateEvent, handleDeleteEvent} = require('../controllers/events.js');
// const requireAdmin = require('../middlewares/requireAdmin.js');
const requireRequestBody = require('../middlewares/requireRequestBody.js');


eventsRouter.get('/', asyncHandler(handleAllEvents));
eventsRouter.post('/',requireRequestBody, asyncHandler(handleCreateEvent));
eventsRouter.put('/:id',requireRequestBody,asyncHandler(handleUpdateEvent));
eventsRouter.delete('/:id', asyncHandler(handleDeleteEvent));

module.exports = eventsRouter;