const {
  getPhoto,
  postPhoto,
  deletePhoto,
  findOne,
} = require('../models/carrousel');

module.exports.handleOneCarrousel = async (req, res) => {
  const data = await findOne(req.params.id);
  res.status(200).send(data);
};

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
