let msg = {};
// process.loadEnvFile();

import { createClient } from "@libsql/client";

const db = createClient({
  url: process.env.DB_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

msg.reciveMSG = async (req, res) => {
  const query = "SELECT id,email,control FROM webdev";
  try {
    let { rows } = await db.execute(query);
    // console.log(rows);

    // res.json({
    //   id: rows.id,
    //   email: rows.email,
    //   control: rows.control,
    // });
    res.sendStatus(200).json(rows);
    // res.sendStatus(200);
  } catch (error) {
    console.error("Error updating user:", error);
    res.sendStatus(500);
  }
};

msg.messages = async (req, res) => {
  const formData = req.body; // Aquí se capturan los datos del FormData
  console.log("Datos recibidos:", formData);

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
    console.error("Error submit form:", error);
    res.sendStatus(500);
  }
};

export default msg;
