const db = require('../db.js');


const postOne = async (req) => {
    const { firstname,lastname, message, email } = req.body;
    return db.query('INSERT INTO messages(firstname,lastname,message,email) VALUES (?,?,?,?) ',
    [firstname,lastname,message,email],
    (err,res) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error sending message");
        } else {
          res.status(200).send("Your message has been sent");
        }
      }
    );
};


module.exports = { postOne };