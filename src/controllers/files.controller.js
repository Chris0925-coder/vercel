let controller = {};
// process.loadEnvFile();

import { createClient } from "@libsql/client";

import { put } from "@vercel/blob";

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

controller.homeArticles = async (req, res) => {
  const query = "SELECT id,title,paragraph,images,link FROM articles";
  try {
    let { rows } = await db.execute(query);
    // console.log(rows);

    // res.json({
    //   id: rows.id,
    //   email: rows.email,
    //   control: rows.control,
    // });
    res.render("articles.html", { title: "Home", tab: rows });
    // res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

controller.showArticles = async (req, res) => {
  const query =
    "SELECT id,title,paragraph,images,link FROM articles ORDER BY id DESC";
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

controller.articles = async (req, res) => {
  let files = req.file;
  let { title, paragraph, link } = req.body;
  let dest = files.filename;
  console.log(title, paragraph, link);

  let data = await db.execute({
    sql: "SELECT id FROM articles",
    // args: [userId],
  });

  const query =
    "INSERT INTO articles (title,paragraph,images,link) VALUES (?,?,?,?)";
  const params = [title, paragraph, dest, link];

  try {
    const blob = await put(dest, files, {
      access: "public", // o 'private'
      token: process.env.BLOB_READ_WRITE_TOKEN, // Usa el token de la variable de entorno
    });

    console.log(blob);

    await db.execute(query, params);

    res.render("articles.html", { title: "Home", tab: data.rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // });
};

controller.updateArticles = async (req, res) => {
  let articlesData = req.body;
  const userId = req.params.id;
  let files = req.file;
  // console.log(userId);
  console.log(articlesData);
  // console.log(files);

  let existData = await db.execute({
    sql: "SELECT id,title,images,paragraph,link FROM articles WHERE id = ?",
    args: [userId],
  });

  if (!files) {
    files = existData.rows[0].images;
  } else {
    files = files.filename;
  }

  if (!articlesData.title) articlesData.title = existData.rows[0].title;

  if (!articlesData.paragraph)
    articlesData.paragraph = existData.rows[0].paragraph;

  if (!articlesData.link) articlesData.link = existData.rows[0].link;
  // console.log(existData.rows[0].paragraph);
  //
  // console.log(dest);

  // console.log(dest);

  // let c = req.body;
  // const clientIp = req.connection.remoteAddress;

  // let c = JSON.parse(articlesData);
  // console.log(c);
  let data = await db.execute({
    sql: "SELECT id FROM articles",
    // args: [userId],
  });

  // console.log(data);
  // let suma = data.rows[0].count + c.count;

  const query =
    "UPDATE articles SET title = ?, paragraph=?, images=?, link=? WHERE id = ?";
  const params = [
    articlesData.title,
    articlesData.paragraph,
    files,
    articlesData.link,
    userId,
  ];

  try {
    await db.execute(query, params);
    // console.log(`Web with ID ${c.domain} updated visit ${suma} successfully!`);
    // res.sendStatus(200);
    res.render("articles.html", { title: "Home", tab: data.rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

controller.deleteArticles = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);

  // const query = "DELETE FROM articles WHERE id = ?";
  // const params = [userId];
  try {
    // let { rows } = await db.delete(query, params);
    // console.log(rows);

    let data = await db.execute({
      sql: "DELETE FROM articles WHERE id = ?",
      args: [userId],
    });

    // res.json({
    //   id: rows.id,
    //   email: rows.email,
    //   control: rows.control,
    // });
    res.status(200).json(data);
    // res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

controller.profile = (req, res) => {
  let { id } = req.cookies;
  db.serialize(() => {
    db.all(
      `SELECT * FROM music WHERE user_id='${id}' ORDER BY filename DESC Limit 10`,
      (err, rows) => {
        if (err) {
          res.json(err);
        } else {
          if (err) {
            res.status(500).send(message.err);
          }

          let { name, username, email } = req.cookies;
          let cookies = [
            {
              id: id,
              name: name,
              username: username,
              email: email,
            },
          ];

          db.all(
            `SELECT video FROM videos ORDER BY video DESC LIMIT 1;`,
            (err, rowsC) => {
              db.all(
                `SELECT * FROM images WHERE user_id='${id}'`,
                (err, rowsB) => {
                  res.render("profile.html", {
                    title: "PROFILE",
                    tab: cookies,
                    tabB: rows,
                    tabC: rowsB,
                    tabD: [],
                    tabE: rowsC[0].video,
                  });
                }
              );
            }
          );
        }
      }
    );
  });
};

controller.init = (req, res) => {
  db.serialize(() => {
    db.all(`SELECT * FROM music`, (err, rows) => {
      if (err) {
        res.json(err);
      } else {
        let token = req.cookies.token;

        if (token) {
          let { name, username, email } = req.cookies;
          let cookies = [
            {
              name: name,
              username: username,
              email: email,
            },
          ];
          db.all(`SELECT * FROM images`, (err, rowsB) => {
            res.render("storage.html", {
              title: "HOME",
              tab: cookies,
              tabB: rows,
              tabC: rowsB,
            });
          });
        } else {
          res.render("login.html", { title: "LOGIN", tab: [], tabB: [] });
        }
      }
    });
  });
};

controller.initIMG = (req, res) => {
  db.serialize(() => {
    db.all(`SELECT * FROM images`, (err, rows) => {
      if (err) {
        res.json(err);
      } else {
        res.render("images.html", { title: "IMAGES", tab: rows, tabB: [] });
      }
    });
  });
};

controller.initMUSIC = (req, res) => {
  db.serialize(() => {
    db.all(`SELECT * FROM music`, (err, rows) => {
      if (err) {
        res.json(err);
      } else {
        res.render("music.html", { title: "MUSIC", tab: rows, tabB: [] });
      }
    });
  });
};

controller.save = (req, res) => {
  let { file } = req;
  let { id, name, username, email } = req.cookies;

  let filename = file.filename;
  let artist = file.artist;
  let dest = file.destination;
  db.serialize(() => {
    db.all(
      "INSERT INTO music (user_id,filename,artist,url) VALUES (?,?,?,?)",
      [id, filename, artist, dest],
      (err, rows) => {
        if (err) {
          res.json(err);
        } else {
          db.all(
            `SELECT * FROM music WHERE user_id='${id}' ORDER BY filename DESC LIMIT 5;`,
            (err, rows) => {
              if (err) {
                res.json(err);
              } else {
                let cookies = [{ id, name, username, email }];
                res.render("profile.html", {
                  title: "MUSIC",
                  tab: cookies,
                  tabB: rows,
                  tabC: [],
                  tabD: [],
                  tabE: [],
                });
              }
            }
          );
        }
      }
    );
  });
};

controller.saveIMG = (req, res) => {
  let files = req.files;
  let { id, name, username, email } = req.cookies;
  db.serialize(() => {
    for (let index of files) {
      let filename = index.filename;
      let dest = index.destination;
      db.all(
        "INSERT INTO images (user_id,filename,url) VALUES (?,?,?)",
        [id, filename, dest],
        (err, rows) => {
          if (err) {
            res.json(err);
          }
        }
      );
    }
  });
};

controller.delete = (req, res) => {
  let { _id } = req.body;
  let { id } = req.cookies;
  db.serialize(() => {
    db.all(`DELETE FROM music WHERE id=${_id}`, (err, rows) => {
      if (err) {
        res.json(err);
      }
    });

    db.all(`SELECT * FROM music WHERE user_id='${id}'`, (err, rows) => {
      let { name, username, email } = req.cookies;
      let cookies = [
        {
          name: name,
          username: username,
          email: email,
        },
      ];

      db.all(`SELECT * FROM images WHERE user_id='${id}'`, (err, rowsB) => {
        res.render("profile.html", {
          title: "PROFILE",
          tab: cookies,
          tabB: rows,
          tabC: rowsB,
          tabD: [],
          tabE: [],
        });
      });
    });
  });
};

controller.deleteIMG = (req, res) => {
  let { _idIMG } = req.body;
  let { id } = req.cookies;
  db.serialize(() => {
    db.all(`DELETE FROM images WHERE id=${_idIMG}`, (err, rows) => {
      if (err) {
        res.json(err);
      }
    });

    db.all(`SELECT * FROM music WHERE user_id='${id}'`, (err, rows) => {
      let { name, username, email } = req.cookies;
      let cookies = [
        {
          name: name,
          username: username,
          email: email,
        },
      ];

      db.all(`SELECT * FROM images WHERE user_id='${id}'`, (err, rowsB) => {
        res.render("profile.html", {
          title: "PROFILE",
          tab: cookies,
          tabB: rows,
          tabC: rowsB,
          tabD: [],
          tabE: [],
        });
      });
    });
  });
};

controller.saveVideo = (req, res) => {
  let { file } = req;
  let { id, name, username, email } = req.cookies;

  let filename = file.filename;
  db.serialize(() => {
    db.all("INSERT INTO videos (video) VALUES (?)", [filename], (err, rows) => {
      if (err) {
        res.json(err);
      }

      db.all(
        `SELECT video FROM videos ORDER BY video DESC LIMIT 1;`,
        (err, rowsC) => {
          // console.log(rowsC);

          db.all(`SELECT * FROM music WHERE user_id='${id}'`, (err, rowsB) => {
            if (err) {
              res.json(err);
            } else {
              db.all(
                `SELECT * FROM music WHERE user_id='${id}'`,
                (err, rows) => {
                  if (err) {
                    res.json(err);
                  } else {
                    let cookies = [{ id, name, username, email }];
                    let data = `Video enviado ${filename}`;
                    res.render("profile.html", {
                      title: "MUSIC",
                      tab: cookies,
                      tabB: rows,
                      tabC: rowsB,
                      tabD: data,
                      tabE: rowsC[0].video,
                    });
                  }
                }
              );
            }
          });
        }
      );
    });
  });
};

export default controller;
