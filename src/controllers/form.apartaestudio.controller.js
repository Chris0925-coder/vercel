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
      "SELECT id,fullname,phone,mail,cedula,referencia,comentarios,fecha,web FROM apartaestudio ORDER BY id DESC";

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

  files.map((f, index) => {
    let filesArray = {
      [index]: f.originalname,
    };

    // if (filesArray[0] != "img.png" && filesArray[1] != "img2.jpg") {
    //   images.splice(index, 1, filesArray[index]);
    // } else

    if (filesArray[0] != "img.png") {
      images.splice(0, 1, filesArray[0]);
      images.splice(1, 1, "img2.jpg");
    } else if (filesArray[1] != "img2.jpg") {
      images.splice(0, 1, "img.png");
      images.splice(1, 1, filesArray[1]);
    } else {
      images.splice(0, 2, filesArray[0], filesArray[1]);
    }

    // return f.originalname;
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
