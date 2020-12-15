const contactRouter = require('./contact');

module.exports = (app) => {
  app.use('/contact', contactRouter);
};

