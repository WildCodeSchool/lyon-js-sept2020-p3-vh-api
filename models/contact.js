const db = require('../db.js');

const getAllMessages = async () => {
  return db.query('SELECT * FROM messages')
};

const getOneMessage = async (req) => {
const idMessage = req.params.id
  return db.query('SELECT * FROM messages WHERE id = ?'
  ,[idMessage]
  )
};


const postOneMessage = async (req) => {
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


module.exports = {getAllMessages,getOneMessage, postOneMessage };