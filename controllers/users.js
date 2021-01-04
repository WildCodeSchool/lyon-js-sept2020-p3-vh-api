const {findAll, findOne, createUser, deleteUser, updateUser, findAllAnim } = require ('../models/users.js')


module.exports.handleAllAnimators = async (req, res) => {
    const datas = await findAllAnim(req);
    res.send(datas.map(({ id, email }) => ({ id, email })));
} 

/* module.exports.handleAllAnimators = async (req, res) => {
    const rawData = await findAllAnim();
    res.send(rawData); 
};  */

module.exports.handleAllUsers = async (req, res) => {
    const datas = await findAll();
    res.send(datas.map(({ id, email }) => ({ id, email })));
}

module.exports.handleAnUser = async (req, res) => {
    res.send(await findOne(req.params.id));
}

module.exports.handleOneUserCreation = async (req, res) => {
    const { firstname, lastname, email, password, password_confirmation, phone: phone_number, photo_url, bio, instagram_url, facebook_url, twitter_url } = req.body;
    const createdUserId = await createUser({firstname, lastname, email, password, password_confirmation, phone_number, photo_url, bio, instagram_url, facebook_url, twitter_url});
    return res.status(201).json(createdUserId)
}

module.exports.handleOneUserDeletion = async (req, res) => {
    await deleteUser(req.params.id);
    res.sendStatus(204)
}

module.exports.handleOneUserUpdate = async (req, res) => {
  const { firstname, lastname, phone_number, password, password_confirmation, email } = req.body;
  const attributes = {firstname, lastname, phone_number, password, password_confirmation, email };
  const data = await updateUser(req.params.id, attributes);
  res.send(data);
}

