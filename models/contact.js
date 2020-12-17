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

const deleteOneMessage = async (req) => {
  const idMessage = req.params.id
    return db.query('DELETE FROM messages WHERE id = ?'
    ,[idMessage]
    )
  };


module.exports = {getAllMessages,getOneMessage, postOneMessage, deleteOneMessage };