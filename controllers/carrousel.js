const { getPhoto, postPhoto, deletePhoto } = require('../models/carrousel');

module.exports.handleCarrouselGet = async (req, res) => {
  const rawData = await getPhoto(req);
  res.json(rawData);
};

module.exports.handleCarrouselPost = async (req, res) => {
  const rawData = await postPhoto(req);
  res.json(rawData);
};

module.exports.handleCarrouselDelete = async (req, res) => {
  await deletePhoto(req);
  res.sendStatus(204);
};
