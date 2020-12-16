const { findSponsor, createSponsor, updateSponsor, deleteSponsor } = require('../models/sponsors');


module.exports.handleAllSponsor = async (req, res) => {
    const { name, image } = req.body;
  const data = await findSponsor();
  return res.status(201).send(data);
};

module.exports.handleCreateSponsor = async (req, res) => {
    const data = await createSponsor(req);
    return res.status(201).send(data);
  };

module.exports.handleUpdateSponsor = async (req, res) => {
    const { name, image } = req.body;
  const data = await updateSponsor();
  return res.status(201).send(data);
};

module.exports.handleDeleteSponsor = async (req, res) => {
    const { name, image } = req.body;
  const data = await deleteSponsor();
  return res.status(201).send(data);
};