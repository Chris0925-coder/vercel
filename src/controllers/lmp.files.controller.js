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

export default controller;
