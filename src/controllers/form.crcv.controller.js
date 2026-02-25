let msg = {};
// process.loadEnvFile();

import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.DB_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

msg.showMSG = async (req, res) => {
  const query =
    "SELECT id,name,email,phone,control,date FROM formCRCV ORDER BY id DESC";
  try {
    let { rows } = await db.execute(query);
    // console.log(rows);

    // res.json({
    //   id: rows.id,
    //   email: rows.email,
    //   control: rows.control,
    // });
    res.status(200).json(rows);
    // res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

msg.messages = async (req, res) => {
  const formData = req.body;

  const opciones = {
    timeZone: "America/Panama",
    dateStyle: "full",
    timeStyle: "long",
    hour12: false,
  };

  const horaPanama = new Intl.DateTimeFormat("es-PA", opciones).format(
    new Date(),
  );

  // Aquí se capturan los datos del FormData
  // console.log("Datos recibidos:", formData);

  let c = JSON.parse(formData);
  //   let data = await db.execute({
  //     sql: "SELECT id,count,domain FROM counts WHERE id=?",
  //     args: [c.id],
  //   });
  //   let suma = data.rows[0].count + c.count;

  const query =
    "INSERT INTO formCRCV (name, email, phone, control, date) VALUES (?,?,?,?,?)";
  const params = [c.name, c.email, c.phone, c.control, horaPanama];

  try {
    await db.execute(query, params);
    res.sendStatus(200).json({
      message: `User with email: ${c.email} send message ${c.control} successfully!`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

msg.delete = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const query = "DELETE FROM formCRCV WHERE id = (?)";
  const params = [id];

  try {
    await db.execute(query, params);
    console.log(`Delete with ID ${id} successfully!`);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default msg;
