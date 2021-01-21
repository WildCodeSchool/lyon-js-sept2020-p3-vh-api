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
  const rows = await db.query(
    "SELECT o.order_id, u.id as user_id, u.firstname, u.lastname, u.email, e.id as event_id, o.event_quantity, e.title, e.price  FROM `order` as o JOIN user AS u ON o.user_id = u.id JOIN event as e ON o.event_id = e.id WHERE order_id=?",
    [orderId]
  );
  if (rows.length) {
    return rows;
  }
  if (failIfNotFound) throw new RecordNotFoundError("event", orderId);
  return null;
};

const postOneOrder = async (req) => {
  const order_id = uuidv4();
  return Promise.all(
    req.body.map(async (item) => {
      const datasToRecord = {
        order_id,
        user_id: req.session.userId,
        event_id: item.id,
        event_quantity: item.quantity,
      };
      await db.query(
        `INSERT INTO \`order\` SET ${definedAttributesToSqlSet(datasToRecord)}`,
        datasToRecord
      );
    })
  )
    .then(() =>
      Promise.all(
        req.body.map(async (item) => {
          await db.query(
            `UPDATE event SET availabilities = availabilities - ? WHERE id = ?`,
            [item.quantity, item.id]
          );
        })
      )
    )
    .then(() => findOneOrder(order_id));
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

const deleteOneOrder = async (id, failIfNotFound = true) => {
  const res = await db.query("DELETE FROM `order` WHERE order_id=?", [id]);
  if (res.affectedRows !== 0) {
    return true;
  }
  if (failIfNotFound) throw new RecordNotFoundError("event", id);
  return false;
};

module.exports = {
  getAllOrders,
  postOneOrder,
  findOneOrder,
  findOrdersByEvent,
  findOrdersByUser,
  deleteOneOrder,
};
