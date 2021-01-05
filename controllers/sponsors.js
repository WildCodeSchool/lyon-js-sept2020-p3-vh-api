const { findSponsor, createSponsor, updateSponsor, deleteSponsor } = require('../models/sponsors');


module.exports.handleAllSponsor = async (req, res) => {
  const data = await findSponsor();
  return res.status(200).send(data);
};

module.exports.handleCreateSponsor = async (req, res) => {
    const data = await createSponsor(req);
    return res.status(201).send(data);
  };

module.exports.handleUpdateSponsor = async (req, res) => {
  const data = await updateSponsor(req.params.id, req.body);
  return res.send(data);
};

module.exports.handleDeleteSponsor = async (req, res) => {
  await deleteSponsor(req.params.id);
  return res.status(204)
};