const {findAll, findOne, createUser, deleteUser, updateUser} = require ('../models/users.js')

module.exports.handleAllUsers = async (req, res) => {
    const datas = await findAll();
    res.send(datas.map(({ id, email }) => ({ id, email })));
}

module.exports.handleAnUser = async (req, res) => {
    const rawData = await findOne(req.params.id);
    res.json(rawData)
}

module.exports.handleOneUserCreation = async (req, res) => {
    const createdUserId = await createUser(req.body);
    return res.status(201).json(createdUserId)
}

module.exports.handleOneUserDeletion = async (req, res) => {
    await deleteUser(req);
    res.sendStatus(204)
}

module.exports.handleOneUserUpdate = async (req, res) => {
  const { password, password_confirmation, email } = req.body;
  const attributes = { password, password_confirmation, email };
  const data = await updateUser(req.params.id, attributes);
  res.send(data);
}

