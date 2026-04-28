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
    "SELECT id,title,paragraph,images,link,origin,date,modify FROM articles WHERE origin='lmp'";
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
    "SELECT id,title,paragraph,images,link,origin,date,modify FROM articles WHERE origin = 'lmp' ORDER BY id DESC";
  try {
    let { rows } = await db.execute(query);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

controller.showArticle = async (req, res) => {
  const userId = req.params.id;

  try {
    let rows = await db.execute({
      sql: "SELECT id,title,images,paragraph,link,origin,date,modify FROM articles WHERE id = ?",
      args: [userId],
    });
    // let { rows } = await db.execute(query, params);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

controller.article = async (req, res) => {
  let files = req.file;
  let { title, paragraph, paragraphs, link, origin, date } = req.body;

  if (files === undefined) {
    files = {
      originalname: "logo.jpg",
    };
  }
  try {
    let data = await db.execute({
      sql: "SELECT id FROM articles",
      // args: [userId],
    });

    let query =
      "INSERT INTO articles (title, paragraph, paragraphs, images, link, origin, date) VALUES (?,?,?,?,?,?,?)";
    let params = [
      title,
      paragraph,
      paragraphs,
      files.originalname,
      link,
      origin,
      date,
    ];

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

controller.updateArticles = async (req, res) => {
  let articlesData = req.body;
  const userId = req.params.id;
  let files = req.file;

  let existData = await db.execute({
    sql: "SELECT id,title,images,paragraph,paragraphs,link,origin,date,modify FROM articles WHERE id = ?",
    args: [userId],
  });

  if (!files) {
    files = existData.rows[0].images;
  } else {
    files = files.originalname;
  }

  if (!articlesData.title) articlesData.title = existData.rows[0].title;

  if (!articlesData.paragraph)
    articlesData.paragraph = existData.rows[0].paragraph;

  if (!articlesData.paragraphs)
    articlesData.paragraphs = existData.rows[0].paragraphs;

  if (!articlesData.link) articlesData.link = existData.rows[0].link;

  articlesData.date = existData.rows[0].date;

  if (!articlesData.update) existData.rows[0].modify;
  // let data = await db.execute({
  //   sql: "SELECT id FROM articles",
  // });

  const query =
    "UPDATE articles SET title = ?, paragraph=?, paragraphs=?, images=?, link=?, origin=?, date=?, modify=? WHERE id = ?";
  const params = [
    articlesData.title,
    articlesData.paragraph,
    articlesData.paragraphs,
    files,
    articlesData.link,
    articlesData.origin,
    articlesData.date,
    articlesData.update,
    userId,
  ];

  try {
    await db.execute(query, params);
    // res.render("articles.html", { title: "Home", tab: data.rows });
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

controller.delete = async (req, res) => {
  const userId = req.params.id;

  try {
    let data = await db.execute({
      sql: "DELETE FROM articles WHERE id = ?",
      args: [userId],
    });

    res.status(204).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default controller;
