const {findAll, findOne, createUser, deleteUser, updateUser} = require ('../models/users.js')

module.exports.handleAllUsers = async (req, res) => {
    const rawData = await findAll();
    res.json(rawData)
}

module.exports.handleAnUser = async (req, res) => {
    const rawData = await findOne();
    res.json(rawData)
}

module.exports.handleOneUserCreation = async (req, res) => {
    const rawData = await createUser();
    res.json(rawData)
}

module.exports.handleOneUserDeletion = async (req, res) => {
    const rawData = await deleteUser();
    res.sendStatus(204)
}

module.exports.handleOneUserUpdate = async (req, res) => {
    const rawData = await updateUser();
    res.json(rawData)
}

