let controller = {};
// process.loadEnvFile();

import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.TURSO_DB_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

controller.login = async (req, res) => {
  let { token } = req.cookies;
  // console.log(token);
  try {
    if (token && token.includes("ey")) return res.redirect("/home");
    // if (!token) {
    res.render("login.html", { title: "LOGIN", tab: [], message: [] });
    // }
    // res.render("analytic.html", { title: "Counter", tab: [], messages: [] });
    // res.redirect("/");
    // }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

controller.analytics = async (req, res) => {
  const query = "SELECT count,domain,date FROM counts";
  console.log("A");
  try {
    let { rows } = await db.execute(query);
    return res.render("analytic.html", { title: "ANALYTICS", tab: rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
};

export default controller;
