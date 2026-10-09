let controller = {};
// process.loadEnvFile();

import { createClient } from "@libsql/client";

// import { put } from "@vercel/blob";

const db = createClient({
  url: process.env.DB_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

controller.article = async (req, res) => {
  let { files, references } = req.file;
  let { fullname, phone, mail, control, date } = req.body;

  if (files === undefined) {
    files = {
      originalname: "logo.jpg",
    };
  }
  try {
    let data = await db.execute({
      sql: "SELECT id FROM apartaestudio",
    });

    let query =
      "INSERT INTO apartaestudio (fullname, phone, mail, cedula, referencias, comentarios, fecha) VALUES (?,?,?,?,?,?,?)";
    let params = [
      fullname,
      phone,
      mail,
      files.originalname,
      references.originalname,
      control,
      date,
    ];

    await db.execute(query, params);

    res.status(201).json({ message: "Upload Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default controller;
