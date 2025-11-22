let controller = {};
// process.loadEnvFile();

import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.TURSO_DB_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

controller.admin = async (req, res) => {
  const domain = "https://www.crcvpanama.org";
  try {
    // const query = "SELECT count,domain,date FROM counts WHERE domain=?";

    // let { rows } = await db.execute(query);

    let rows = await db.execute({
      sql: "SELECT count,domain,date FROM counts WHERE domain=?",
      args: [domain],
    });

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default controller;
