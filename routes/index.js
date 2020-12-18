const sponsorsRoutes = require('./sponsors');
const carrouselRoute = require('./carrousel');
const contactRouter = require('./contact');

module.exports = (app) => {
  app.use('/sponsors', sponsorsRoutes);
  app.use('/', carrouselRoute);
  app.use('/contact', contactRouter);
};
