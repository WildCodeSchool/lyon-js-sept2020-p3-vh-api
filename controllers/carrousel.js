const {
  getPhoto,
  postPhoto,
  deletePhoto,
  findOne,
} = require("../models/carrousel");

module.exports.handleOneCarrousel = async (req, res) => {
  const data = await findOne(req.params.id);
  res.status(200).send(data);
};

module.exports.handleCarrouselGet = async (req, res) => {
  const rawData = await getPhoto(req);
  res.json(rawData);
};

module.exports.handleCarrouselPost = async (req, res) => {
  const { name, description } = req.body;
  const image = req.file ? req.file.path : null;
  const rawData = await postPhoto({ name, description, image });
  res.json(rawData);
};

module.exports.handleCarrouselDelete = async (req, res) => {
  await deletePhoto(req);
  res.sendStatus(204);
};
