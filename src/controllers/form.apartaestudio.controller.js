let controller = {};
// process.loadEnvFile();

import { createClient } from "@libsql/client";

// import { put } from "@vercel/blob";

const db = createClient({
  url: process.env.DB_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

controller.article = async (req, res) => {
  let { files } = req;

  let fileName = files.map((f, index) => {
    let filesArray = {
      [index]: f.originalname,
    };

    return filesArray[index];
  });

  console.log(fileName);

  let { fullname, phone, mail, control, web, date } = req.body;

  if (files === undefined) {
    files = {
      originalname: " ",
    };
  }

  try {
    // let data = await db.execute({
    //   sql: "SELECT id FROM apartaestudio",
    // });

    let query =
      "INSERT INTO apartaestudio (fullname, phone, mail, cedula, comentarios, fecha, web) VALUES (?,?,?,?,?,?,?)";
    let params = [fullname, phone, mail, fileName, control, date, web];

    await db.execute(query, params);

    res.status(201).json({ message: "Upload Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

controller.aparatestudio = async (req, res) => {
  try {
    const query =
      "SELECT fullname,phone,mail,cedula,comentarios,fecha,web FROM apartaestudio";

    let { rows } = await db.execute(query);

    res.render("apartaestudio.html", {
      title: "FORMULARIO APARTAESTUDIOS",
      tab: rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default controller;
