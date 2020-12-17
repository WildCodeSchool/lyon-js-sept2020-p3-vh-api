const { SESSION_COOKIE_NAME } = require('../env');
const {findByEmail, verifyPassword } = require('../models/users')

module.exports.login = async (req ,res) => {
  const {email, password} = req.body;
  const user = await findByEmail(email, false);
  if(user && (await verifyPassword(user, password))) {
    if (req.body.stayConnected) {
      req.session.cookie.maxAge = 7 * 24 * 60 * 60 * 1000; // cooki
    }
    req.session.userId = user.id;
    req.session.save(() => {
      return res.sendStatus(200);
    });
  } else {
    
    res.status(401).send('Invalid Credentials');
  }
};

module.exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).send('Could not destroy session');
    res.clearCookie(SESSION_COOKIE_NAME, { path: '/' });
    return res.status(200).send('session deleted');
  });
};