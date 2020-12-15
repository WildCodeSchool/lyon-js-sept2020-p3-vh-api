// const { verify } = require('argon2');
// const { find } = require('lodash')
const {findByEmail, verifyPassword } = require('../models/users')

module.exports.login = async (req ,res) => {
  const {email, password} = req.body;
  const user = await findByEmail(email, false);
  console.log(user)
  if(user && (await verifyPassword(user, password))) {
    req.session.userId = user.id;
    req.session.save((err) => {
      if (err) return res.sendStatus(500)
      return res.sendStatus(200);
    });
  } else {
    res.status(401).send('Invalid Credentials');
  }
};