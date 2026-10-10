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
      "SELECT fullname,phone,mail,cedula,comentarios,fecha,web FROM apartaestudio";

    let { rows } = await db.execute(query);
    const images = [];
    // console.log(rows);

    let fileName = rows.map((f, index) => {
      console.log(f.cedula);
      // let img = JSON.stringify(f);
      // let cedula = f[index].cedula.split(",");
      // let filesArray = {
      //   [index]: cedula,
      // };

      if (!f.cedula.includes(",")) {
        images.push(f.cedula);
      }

      if (f.cedula.includes(",")) {
        console.log(f.cedula);
        let im = f.cedula.split(",");

        images.push(im[0]);
        images.push(im[1]);
        console.log(im);
      }

      // let image = f.cedula.split(",");
      // f.cedula
      // console.log(img);

      // return images;
      // return filesArray;
    });

    // console.log(fileName);

    // let images = JSON.parse(rows.cedula);

    res.render("apartaestudio.html", {
      title: "FORMULARIO APARTAESTUDIOS",
      tab: rows,
      img: images,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

controller.article = async (req, res) => {
  let { files } = req;

  let fileName = files.map((f, index) => {
    let filesArray = {
      [index]: f.originalname,
    };

    return filesArray[index];
  });

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

export default controller;
