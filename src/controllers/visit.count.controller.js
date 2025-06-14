let controller = {};
// process.loadEnvFile();

import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.TURSO_DB_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

controller.analytics = async (req, res) => {
  const query = "SELECT count,domain FROM counts";
  try {
    let { rows } = await db.execute(query);
    res.render("analytic.html", { title: "ANALYTICS", tab: rows });
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

controller.count = async (req, res) => {
  let analyticsData = req.body;
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
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export default controller;
