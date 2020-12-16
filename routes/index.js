const usersRouter= require('./users');
const authRouter= require('./auth');
const currentUserRoutes = require('./currentUser');

module.exports = (app) => {
  app.use('/users', usersRouter);
  app.use('/auth', authRouter);
  app.use('/me', currentUserRoutes);
};
