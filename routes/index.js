
const wineRoute = require('./wine');
const contactRouter = require('./contact');
const sponsorsRoutes = require('./sponsors');
const carrouselRoute = require('./carrousel');

module.exports = (app) => {
  app.use('/products', wineRoute);
  app.use('/sponsors', sponsorsRoutes);
  app.use('/', carrouselRoute);
  app.use('/contact', contactRouter);
};

