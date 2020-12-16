const sponsorsRoutes = require('./sponsors');

module.exports = (app) => {
  app.use('/sponsors', sponsorsRoutes);
};
