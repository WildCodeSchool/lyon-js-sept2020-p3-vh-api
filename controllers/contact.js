const { postOne } = require('../models/contact.js');

module.exports.handleOneContactPost = async (req, res) => {
  const rawData = await postOne(req);
  res.json(rawData);
};
