const wineRoute = require('./wine');
const contactRouter = require('./contact');

module.exports = (app) => {
  app.use('/products', wineRoute);
  app.use('/contact', contactRouter);
};
