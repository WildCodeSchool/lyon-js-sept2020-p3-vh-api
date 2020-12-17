const carrouselRoute = require('./carrousel');
const contactRouter = require('./contact');

module.exports = (app) => {
  app.use('/', carrouselRoute);
  app.use('/contact', contactRouter);
};
