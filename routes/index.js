const wineRoute = require('./wine');

// eslint-disable-next-line
module.exports = (app) => {
  app.use('/products', wineRoute);
};
