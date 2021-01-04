/* const { getAllAnimators/* ,getOneAnimator, postOneAnimator,putOneAnimator, deleteOneAnimator */  /* } = require('../models/animators.js');

module.exports.handleGetAllAnimators = async (req, res) => {
  const rawData = await getAllAnimators();
  res.send(rawData);
}; */ 

/* module.exports.handleGetOneAnimator = async (req, res) => {
  res.send(await getOneAnimator(req.params.id));
};

module.exports.handleOnePostAnimator = async (req, res) => {
  const { firstname, lastname, email, image, biographie, facebook_url, twitter_url, instagram_url} = req.body;
  const data = await postOneAnimator({ firstname, lastname, email, image, biographie,facebook_url, twitter_url,instagram_url });
  return res.status(201).send(data);
};

module.exports.handlePutOneAnimator = async (req, res) => {
    const { firstname, lastname, email, image, biographie, facebook_url, twitter_url, instagram_url} = req.body;
    const attribute = { firstname, lastname, email, image, biographie,facebook_url, twitter_url,instagram_url };
    const data = await putOneAnimator(req.params.id, attribute);
    res.send(data);
};

module.exports.handleDeleteOneAnimator = async (req, res) => {
  await deleteOneAnimator(req);
  res.sendStatus(204);
}; */
