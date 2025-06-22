let controller = {};
// process.loadEnvFile();

import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.TURSO_DB_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

controller.login = async (req, res) => {
  let { token } = req.cookies;
  try {
    if (!token) {
      res.render("login.html", { title: "LOGIN", tab: [], messages: [] });
    } else {
      // res.render("analytic.html", { title: "Counter", tab: [], messages: [] });
      res.redirect("/count");
    }
  } catch (error) {
    console.error("Error: ", error);
    res.sendStatus(500);
  }
};

controller.analytics = async (req, res) => {
  const query = "SELECT count,domain,date FROM counts";
  try {
    let { rows } = await db.execute(query);
    res.render("analytic.html", { title: "ANALYTICS", tab: rows });
  } catch (error) {
    console.error("Error: ", error);
    res.sendStatus(500);
  }
};

controller.count = async (req, res) => {
  let analyticsData = req.body;
  // console.log(analyticsData);
  // let c = req.body;
  // const clientIp = req.connection.remoteAddress;

  let c = JSON.parse(analyticsData);
  let data = await db.execute({
    sql: "SELECT id,count,domain FROM counts WHERE id=?",
    args: [c.id],
  });
  let suma = data.rows[0].count + c.count;

  const query = "UPDATE counts SET count = ?, domain=? WHERE id = ?";
  const params = [suma, c.domain, c.id];

  try {
    await db.execute(query, params);
    console.log(`Web with ID ${c.domain} updated visit ${suma} successfully!`);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating user:", error);
    res.sendStatus(500);
  }
};

export default controller;
