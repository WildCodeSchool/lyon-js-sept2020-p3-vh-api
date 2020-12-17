
const usersRouter= require('./users');
const authRouter= require('./auth');
const currentUserRoutes = require('./currentUser');
const contactRouter = require('./contact');

module.exports = (app) => {
  app.use('/users', usersRouter);
  app.use('/auth', authRouter);
  app.use('/me', currentUserRoutes);
  app.use('/contact', contactRouter);
};

