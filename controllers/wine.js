const {
  getAllWine,
  findById,
  postOneWine,
  putOneWine,
  deleteOneWine,
} = require("../models/wine");

module.exports.handleWineGetAll = async (req, res) => {
  const rawData = await getAllWine();
  res.send(rawData);
};

module.exports.handleWineGetOne = async (req, res) => {
  res.send(await findById(req.params.id));
};

module.exports.handleWinePost = async (req, res) => {
  const image = req.file ? req.file.path : null;
  const {
    name,
    vigneron,
    cepage,
    arome,
    price,
    sommelier,
    website,
    specificities,
    producteur,
  } = req.body;
  const data = await postOneWine({
    name,
    vigneron,
    cepage,
    arome,
    price,
    sommelier,
    image,
    website,
    specificities,
    producteur,
  });
  return res.status(201).send(data);
};

module.exports.handleWinePutOne = async (req, res) => {
  const {
    name,
    vigneron,
    cepage,
    arome,
    price,
    sommelier,
    website,
    specificities,
    producteur,
  } = req.body;
  let image;
  if (req.file) {
    image = req.file.path;
  } else {
    image = req.body.image;
  }
  const attribute = {
    name,
    vigneron,
    cepage,
    arome,
    price,
    sommelier,
    image,
    website,
    specificities,
    producteur,
  };
  const data = await putOneWine(req.params.id, attribute);
  res.send(data);
};

module.exports.handleWineDeleteOne = async (req, res) => {
  await deleteOneWine(req.params.id);
  res.sendStatus(204);
};
