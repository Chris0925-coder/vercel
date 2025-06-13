// import { loadEnvFile } from "node:process";

// loadEnvFile("/development.env");
// process.loadEnvFile();
let controller = {};

// import sqlite3 from "sqlite3";
// import { catchedAsync } from "../utils/catchedAsync.js";
// import { ClientError, ServerError } from "../utils/errors.js";
import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.TURSO_DB_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// });
// const sqlite = sqlite3.verbose();
// console.log(process.env.TURSO_AUTH_TOKEN);

var data = await db.execute("SELECT count FROM counts");

controller.analytics = async (req, res) => {
  const query = "SELECT count FROM counts";
  try {
    let { rows } = await db.execute(query);
    // console.log(rows);
    res.render("analytic.html", { title: "ANALYTICS", tab: rows });
  } catch (error) {
    console.error("Error updating user:", error);
  }
};
// console.log(data.rows[0].count);
// let db = new sqlite.Database(
//   "./database/analytics.db",
//   sqlite.OPEN_READWRITE,
//   (err) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log("Connected to the analytics database.");
//   }
// );

// db.serialize(() => {
//   db.each(`SELECT * FROM sqlite_master`, (err, row) => {
//     if (err) {
//       console.error(err.message);
//     }
//   });
// });

// controller.analytics = (req, res) => {
//   db.serialize(() => {
//     db.all(`SELECT domain,count FROM counts`, (err, rows) => {
//       if (err) res.status(500).json(err);

//       res.render("analytic.html", { title: "ANALYTICS", tab: rows });
//     });
//   });
// };

// controller.count = async (req, res) => {
//   let analyticsData = req.body;
//   let c = JSON.parse(analyticsData);

//   db.serialize(() => {
//   await db.execute(
//     `SELECT count FROM counts WHERE id=(?)`,
//     [c.id],
//     (err, rows) => {
//       if (err) res.status(500).json(err);

//       var suma = rows.count + 1;

//       db.execute(
//         `update counts set (count)=(?),(domain)=(?) WHERE (id)=(?)`,
//         [suma, c.domain, c.id],
//         (err, user) => {
//           if (err) res.status(500).json(err);

//           res.sendStatus(201);
//         }
//       );
//     }
//   );
//   });
// };

controller.count = async (req, res) => {
  // console.log(data.rows[0].count);
  let analyticsData = req.body;
  let c = JSON.parse(analyticsData);
  var suma = data.rows[0].count + c.count;

  const query = "UPDATE counts SET count = ?, domain=? WHERE id = ?";
  const params = [suma, c.domain, c.id];

  try {
    await db.execute(query, params);
    console.log(`Web with ID ${c.domain} updated visit ${suma} successfully!`);
  } catch (error) {
    console.error("Error updating user:", error);
  }
  // console.log(c);
  // await db.execute({
  //   sql: "update counts set count = ?, domain=? WHERE id = ?",
  //   args: [suma, c.domain, c.id],
  // });
};

export default controller;
