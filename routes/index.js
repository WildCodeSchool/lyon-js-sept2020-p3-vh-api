const wineRoute = require('./wine');
const contactRouter = require('./contact');
const sponsorsRoutes = require('./sponsors');
const carrouselRoute = require('./carrousel');
const animatorsRouter = require('./animators')

module.exports = (app) => {
  app.use('/products', wineRoute);
  app.use('/sponsors', sponsorsRoutes);
  app.use('/', carrouselRoute);
  app.use('/contact', contactRouter);
  app.use('/animators', animatorsRouter);
};

