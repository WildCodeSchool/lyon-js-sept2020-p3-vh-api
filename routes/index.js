const carrouselRoute = require('./carrousel');

// eslint-disable-next-line
module.exports = (app) => {
  app.use('/', carrouselRoute);
};
