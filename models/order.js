const { v4: uuidv4 } = require("uuid");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const moment = require("moment");
const db = require("../db.js");
const { RecordNotFoundError } = require("../error-types");
const definedAttributesToSqlSet = require("../helpers/definedAttributesToSQLSet.js");
const { SENDINBLUE_API_KEY } = require("../env");

const getAllOrders = async () => {
  return db.query(
    "SELECT o.order_id, u.id as user_id, u.firstname, u.lastname, u.email, e.id as event_id, o.event_quantity, e.title, e.price  FROM `order` as o JOIN user AS u ON o.user_id = u.id JOIN event as e ON o.event_id = e.id"
  );
};

const findOneOrder = async (id, failIfNotFound = true) => {
  const orderId = id;
  const rows = await db.query(
    "SELECT o.order_id, u.id as user_id, u.firstname, u.lastname, u.email, e.id as event_id, e.title as event_title, o.event_quantity, e.title, e.price, e.date, a.street, a.zipcode, a.city FROM `order` as o JOIN user AS u ON o.user_id = u.id JOIN event AS e ON o.event_id = e.id JOIN address AS a on a.id = e.address_id WHERE order_id=?",
    [orderId]
  );
  if (rows.length) {
    return rows;
  }
  if (failIfNotFound) throw new RecordNotFoundError("event", orderId);
  return null;
};

const sendMail = async (id) => {
  const datasToSend = await findOneOrder(id);
  const customerEmail = datasToSend[0].email;
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = SENDINBLUE_API_KEY;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = "Merci pour votre commande !";
  sendSmtpEmail.htmlContent = `<html>
  <body><h1>Merci pour votre commande, voici son récapitulatif : </h1>
  <table style="border-collapse:collapse;border-style:solid;border-width:1px;border-color:black;text-align:center">
    <thead>
      <tr>
        <th style="border-collapse:collapse;border-style:solid;border-width:1px;border-color:black">Evénement</th>
        <th style="border-collapse:collapse;border-style:solid;border-width:1px;border-color:black">Adresse</th>
        <th style="border-collapse:collapse;border-style:solid;border-width:1px;border-color:black">Date</th>
        <th style="border-collapse:collapse;border-style:solid;border-width:1px;border-color:black">Places réservées</th>
        <th style="border-collapse:collapse;border-style:solid;border-width:1px;border-color:black">Prix unitaire</th>
        <th style="border-collapse:collapse;border-style:solid;border-width:1px;border-color:black">Prix total</th>
      </tr>
    </thead>
    <tbody>
  ${datasToSend
    .map(
      (event) =>
        `<tr>
    <td style="border-collapse:collapse;border-style:solid;border-width:1px;border-color:black">${
      event.title
    }</td>
    <td style="border-collapse:collapse;border-style:solid;border-width:1px;border-color:black">${
      event.street
    } ${event.zipcode} ${event.city}</td>
    <td style="border-collapse:collapse;border-style:solid;border-width:1px;border-color:black">${moment(
      event.date
    ).format("DD-MM-YYYY")}</td>
    <td style="border-collapse:collapse;border-style:solid;border-width:1px;border-color:black">${
      event.event_quantity
    }</td>
    <td style="border-collapse:collapse;border-style:solid;border-width:1px;border-color:black">${Math.round(
      event.price
    )} €</td>
    <td style="border-collapse:collapse;border-style:solid;border-width:1px;border-color:black">${
      event.price * event.event_quantity
    } €</td>
  </tr>
  `
    )
    .join("")}
  <tfoot>
    <td colspan=5 style="border-collapse:collapse;border-style:solid;border-width:1px;border-color:black">Total</td>
    <td style="border-collapse:collapse;border-style:solid;border-width:1px;border-color:black">${datasToSend
      .map((event) => event.price * event.event_quantity)
      .reduce((acc, total) => acc + total)} €</td>
  </tfoot>
    </tbody>
  </table>
  <p>Numéro de commande : ${datasToSend[0].order_id}</p>
  </body></html>`;
  sendSmtpEmail.sender = {
    name: `Morgane Pardo`,
    email: "morgane.pardo@yahoo.com",
  };
  sendSmtpEmail.to = [{ email: customerEmail }];
  sendSmtpEmail.replyTo = {
    email: "morgane.pardo@yahoo.com",
    name: `Morgane Pardo`,
  };

  try {
    apiInstance.sendTransacEmail(sendSmtpEmail);
    return;
  } catch (err) {
    console.error(err);
  }
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
    .then(() => findOneOrder(order_id))
    .then(() => sendMail(order_id));
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
