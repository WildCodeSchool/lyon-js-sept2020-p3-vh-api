const {
  findAll,
  findOne,
  createUser,
  deleteUser,
  updateUser,
  findAllAnim,
  resetPassword,
  storePassword,
} = require("../models/users.js");

module.exports.handleAllAnimators = async (req, res) => {
  const datas = await findAllAnim(req);
  res.send(
    datas.map(({ id, firstname, lastname, email, role, bio, photo_url }) => ({
      id,
      firstname,
      lastname,
      email,
      role,
      bio,
      photo_url,
    }))
  );
};

module.exports.handleAllUsers = async (req, res) => {
  const datas = await findAll(req);
  const allUsersLength = await findAll();
  res.set("X-Total-Count", allUsersLength.length);
  res.send(
    datas.map(
      ({
        id,
        firstname,
        lastname,
        email,
        password,
        password_confirmation,
        phone_number,
        photo_url,
        bio,
        role,
        website_url,
        instagram_url,
        facebook_url,
        twitter_url,
      }) => ({
        id,
        firstname,
        lastname,
        email,
        password,
        password_confirmation,
        phone_number,
        photo_url,
        bio,
        role,
        website_url,
        instagram_url,
        facebook_url,
        twitter_url,
      })
    )
  );
};

module.exports.handleAnUser = async (req, res) => {
  res.send(await findOne(req.params.id));
};

module.exports.handleOneUserCreation = async (req, res) => {
  const image = req.file ? req.file.path : null;
  const {
    firstname,
    lastname,
    email,
    password,
    password_confirmation,
    phone: phone_number,
    bio,
    role,
    instagram_url,
    facebook_url,
    twitter_url,
  } = req.body;
  const createdUserId = await createUser({
    firstname,
    lastname,
    email,
    password,
    password_confirmation,
    phone_number,
    photo_url: image,
    bio,
    role,
    instagram_url,
    facebook_url,
    twitter_url,
  });
  return res.status(201).json(createdUserId);
};

module.exports.handleResetPassword = async (req, res) => {
  await resetPassword(req.body.email);
  return res.sendStatus(200);
};

module.exports.handleStorePassword = async (req, res) => {
  await storePassword(req.body);
  return res.sendStatus(200);
};

module.exports.handleOneUserDeletion = async (req, res) => {
  await deleteUser(req.params.id);
  res.sendStatus(204);
};

module.exports.handleOneUserUpdate = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    password_confirmation,
    phone_number,
    bio,
    role,
    instagram_url,
    facebook_url,
    twitter_url,
    website_url,
    photo_url,
  } = req.body;
  const image = req.file ? req.file.path : photo_url;
  const attributes = {
    firstname,
    lastname,
    email,
    password,
    password_confirmation,
    phone_number,
    photo_url: image,
    bio,
    role,
    website_url,
    instagram_url,
    facebook_url,
    twitter_url,
  };
  const data = await updateUser(req.params.id, attributes);
  res.send(data);
};
