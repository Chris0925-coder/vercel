let msg = {};
// process.loadEnvFile();

import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.DB_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

msg.reciveMSG = async (req, res) => {
  const query = "SELECT id,email,control FROM webdev ORDER BY id DESC";
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
  // Aquí se capturan los datos del FormData
  // console.log("Datos recibidos:", formData);

  let c = JSON.parse(formData);
  //   let data = await db.execute({
  //     sql: "SELECT id,count,domain FROM counts WHERE id=?",
  //     args: [c.id],
  //   });
  //   let suma = data.rows[0].count + c.count;

  const query = "INSERT INTO webdev (email, control) VALUES (?,?)";
  const params = [c.email, c.control];

  try {
    await db.execute(query, params);
    console.log(
      `Web with ID ${c.email} send message ${c.control} successfully!`
    );
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

msg.delete = async (req, res) => {
  const { del } = req.body;
  console.log(del);

  const query = "DELETE FROM webdev WHERE id = ?";
  const params = [del];

  try {
    await db.execute(query, params);
    console.log(`Delete with ID ${del} successfully!`);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default msg;
