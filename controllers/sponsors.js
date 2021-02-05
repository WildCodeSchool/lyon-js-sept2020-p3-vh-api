const {
  findSponsor,
  createSponsor,
  updateSponsor,
  deleteSponsor,
  findOne,
} = require("../models/sponsors");

module.exports.handleOneSponsor = async (req, res) => {
  const data = await findOne(req.params.id);
  res.status(200).send(data);
};

module.exports.handleAllSponsor = async (req, res) => {
  const data = await findSponsor(req);
  const allSponsorsLength = await findSponsor();
  res.set("X-Total-Count", allSponsorsLength.length);
  return res.status(200).send(data);
};

module.exports.handleCreateSponsor = async (req, res) => {
  const { name } = req.body;
  const image = req.file ? req.file.path : null;
  const data = await createSponsor({ name, image });
  return res.status(201).send(data);
};

module.exports.handleUpdateSponsor = async (req, res) => {
  let image;
  if (req.file) {
    image = req.file.path;
  } else {
    image = req.body.image;
  }
  const { name } = req.body;
  const { id } = req.params;
  const data = await updateSponsor({ id, name, image });
  return res.send(data);
};

module.exports.handleDeleteSponsor = async (req, res) => {
  await deleteSponsor(req.params.id);
  return res.status(204);
};
