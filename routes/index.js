
const usersRouter= require('./users');
const authRouter= require('./auth');
const currentUserRoutes = require('./currentUser');
const wineRoute = require('./wine');
const contactRouter = require('./contact');
const sponsorsRoutes = require('./sponsors');
const carrouselRoute = require('./carrousel');
const animatorsRouter = require('./animators')

module.exports = (app) => {
  app.use('/users', usersRouter);
  app.use('/auth', authRouter);
  app.use('/me', currentUserRoutes);
  app.use('/products', wineRoute);
  app.use('/sponsors', sponsorsRoutes);
  app.use('/', carrouselRoute);
  app.use('/contact', contactRouter);
  app.use('/animators', animatorsRouter);
};

