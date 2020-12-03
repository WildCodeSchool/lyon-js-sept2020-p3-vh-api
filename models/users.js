const { countBy } = require('lodash');

const db = require ('../db.js')

const findAll = async () => {
    return db.query('SELECT * FROM user');
}

const findOne = async (req) => {
    const userId = req.params.id
    return db.query('SELECT * FROM user WHERE id=?', [userId]);
}


const createUser = async (req) => {
    const { firstname, lastname, email, password, phone_number, bio, photo, website, role, facebook_url, twitter_url, instagram_url } = req.body;
    return db.query('INSERT INTO users(firstname, lastname, email, password, phone_number, bio, photo, website, role, facebook_url, twitter_url, instagram_url) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',  [firstname, lastname, email, password, phone_number, bio, photo, website, role, facebook_url, twitter_url, instagram_url]);
}

const deleteUser = async (req) => {
    const userId = req.params.id
    return db.query('DELETE FROM user WHERE id=userId', [userId]);
}

const updateUser = async (req) => {
    const userId = req.params.id
    if (req.body.role === 'moderator') {
        const { firstname, lastname, email, password, phone_number, bio, photo, website, role, facebook_url, twitter_url, instagram_url } = req.body;
        return db.query('UPDATE user SET firstname=?, lastname=?, email=?, password=?, phone_number=?, bio=?, photo=?, website=?, role=?, facebook_url=?, twitter_url=?, instagram_url=? WHERE id=?',  [firstname, lastname, email, password, phone_number, bio, photo, website, role, facebook_url, twitter_url, instagram_url, userId]);
    } 
        const { firstname, lastname, email, password, phone_number} = req.body;
        return db.query('UPDATE user SET firstname=?, lastname=?, email=?, password=?, phone_number=? WHERE id=?',  [firstname, lastname, email, password, phone_number, userId]);
    
    
}

module.exports = {findAll, findOne, createUser, deleteUser, updateUser}