const { v4: uuidv4 } = require("uuid");
const db = require("../db.js");
const { RecordNotFoundError } = require("../error-types");
const definedAttributesToSqlSet = require("../helpers/definedAttributesToSQLSet.js");

const getAllOrders = async () => {
  return db.query(
    "SELECT o.order_id, u.id as user_id, u.firstname, u.lastname, u.email, e.id as event_id, o.event_quantity, e.title, e.price  FROM `order` as o JOIN user AS u ON o.user_id = u.id JOIN event as e ON o.event_id = e.id"
  );
};

const findOneOrder = async (id, failIfNotFound = true) => {
  const orderId = id;
  const rows = await db.query("SELECT * FROM `order` WHERE order_id=?", [
    orderId,
  ]);
  if (rows.length) {
    return rows;
  }
  if (failIfNotFound) throw new RecordNotFoundError("event", orderId);
  return null;
};

const postOneOrder = (req) => {
  const order_id = uuidv4();
  return req.body.map((item) => {
    const datasToRecord = {
      order_id,
      user_id: req.session.userId,
      event_id: item.id,
      event_quantity: item.quantity,
    };
    return db
      .query(
        `INSERT INTO \`order\` SET ${definedAttributesToSqlSet(datasToRecord)}`,
        datasToRecord
      )
      .then(() => findOneOrder(order_id));
  });
};

const findOrdersByUser = async (id, failIfNotFound = true) => {
  const rows = await db.query(
    "SELECT o.order_id, u.id as user_id, u.firstname, u.lastname, u.email, e.id as event_id, o.event_quantity, e.title, e.price  FROM `order` as o JOIN user AS u ON o.user_id = u.id JOIN event as e ON o.event_id = e.id WHERE u.id = ?",
    [id]
  );
  if (rows.length) {
    return rows;
  }
  if (failIfNotFound) throw new RecordNotFoundError("event", id);
  return null;
};

const findOrdersByEvent = async (id, failIfNotFound = true) => {
  const rows = await db.query(
    "SELECT o.order_id, u.id as user_id, u.firstname, u.lastname, u.email, e.id as event_id, o.event_quantity, e.title, e.price  FROM `order` as o JOIN user AS u ON o.user_id = u.id JOIN event as e ON o.event_id = e.id WHERE e.id = ?",
    [id]
  );
  if (rows.length) {
    return rows;
  }
  if (failIfNotFound) throw new RecordNotFoundError("event", id);
  return null;
};

module.exports = {
  getAllOrders,
  postOneOrder,
  findOneOrder,
  findOrdersByEvent,
  findOrdersByUser,
};
