let controller = {};
// process.loadEnvFile();

import { createClient } from "@libsql/client";

// import { put } from "@vercel/blob";

const db = createClient({
  url: process.env.DB_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// db.serialize(() => {
//   db.each(
//     `SELECT *
//   FROM articles`,
//     (err, row) => {
//       if (err) {
//         console.error(err.message);
//       }
//     }
//   );
// });

controller.admin = async (req, res) => {
  const query =
    "SELECT id,title,paragraph,images,link,origin FROM articles WHERE origin='lmp'";
  try {
    let { rows } = await db.execute(query);
    // console.log(rows);

    // res.json({
    //   id: rows.id,
    //   email: rows.email,
    //   control: rows.control,
    // });
    // res.render("articles.html", { title: "Home", tab: rows });
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

controller.showArticles = async (req, res) => {
  const query =
    "SELECT id,title,paragraph,images,link,origin FROM articles WHERE origin = 'lmp' ORDER BY id DESC";
  try {
    let { rows } = await db.execute(query);
    // console.log(rows);

    // res.json({
    //   id: rows.id,
    //   email: rows.email,
    //   control: rows.control,
    // });
    res.json(rows);
    // res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

controller.articles = async (req, res) => {
  let files = req.file;
  let { title, paragraph, link, origin } = req.body;
  let dest = files.originalname;
  try {
    let data = await db.execute({
      sql: "SELECT id FROM articles",
      // args: [userId],
    });

    let query =
      "INSERT INTO articles (title,paragraph,images,link, origin) VALUES (?,?,?,?,?)";
    let params = [title, paragraph, dest, link, origin];

    await db.execute(query, params);

    res.status(200).json(data);

    // alert("Uploaded article succesfully");
    // res.render("articles.html", { title: "Home", tab: data.rows });
  } catch (error) {
    // res.json(error);
    res.status(500).json({ message: error.message });
  }
  // });
};

export default controller;
