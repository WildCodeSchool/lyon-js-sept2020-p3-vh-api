const db = require('../db.js');
// const { RecordNotFoundError } = require('../error-types');
// const definedAttributesToSqlSet = require('../helpers/definedAttributesToSQLSet.js');

const getAllOrders = async () => {
  return db.query('SELECT * FROM order');
};

// const findOrdersByUser = async () => {
//  return db.query('SELECT * FROM order');
// };

module.exports = {
 getAllOrders
};
