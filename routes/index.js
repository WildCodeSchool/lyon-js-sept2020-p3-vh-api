const usersRouter= require('./users');
const eventsRouter= require('./events');

// eslint-disable-next-line
module.exports = (app) => {
  app.use('/users', usersRouter);
  app.use('/events', eventsRouter);
};
