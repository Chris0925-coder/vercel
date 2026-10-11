let controller = {};
// process.loadEnvFile();

import { createClient } from "@libsql/client";

// import { put } from "@vercel/blob";

const db = createClient({
  url: process.env.DB_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

controller.aparatestudio = async (req, res) => {
  try {
    const query =
      "SELECT id,fullname,phone,mail,cedula,referencia,comentarios,fecha,web FROM apartaestudio";

    let { rows } = await db.execute(query);

    res.render("apartaestudio.html", {
      title: "FORMULARIO APARTAESTUDIOS",
      tab: rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

controller.article = async (req, res) => {
  let { files } = req;
  let { fullname, phone, mail, control, web, date } = req.body;
  const images = ["img.png", "img2.jpg"];

  let fileName = files.map((f, index) => {
    let filesArray = {
      [index]: f.originalname,
    };

    if (f != undefined) {
      images.splice(index, 1, f.originalname);
    }

    return filesArray[index];
  });

  try {
    let query =
      "INSERT INTO apartaestudio (fullname, phone, mail, cedula, referencia, comentarios, fecha, web) VALUES (?,?,?,?,?,?,?,?)";
    let params = [
      fullname,
      phone,
      mail,
      images[0],
      images[1],
      control,
      date,
      web,
    ];

    await db.execute(query, params);

    res.status(201).json({ message: "Upload Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default controller;
