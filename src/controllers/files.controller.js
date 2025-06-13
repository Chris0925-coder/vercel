import sqlite3 from "sqlite3";
const sqlite = sqlite3.verbose();
let controller = {};

let db = new sqlite.Database("./database/#", sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the files database.");
});

db.serialize(() => {
  db.each(
    `SELECT * 
    FROM music`,
    (err, row) => {
      if (err) {
        console.error(err.message);
      }
    }
  );
});

db.serialize(() => {
  db.each(
    `SELECT * 
  FROM images`,
    (err, row) => {
      if (err) {
        console.error(err.message);
      }
    }
  );
});

db.serialize(() => {
  db.each(
    `SELECT * 
  FROM videos`,
    (err, row) => {
      if (err) {
        console.error(err.message);
      }
    }
  );
});

//  WHERE user_id='${id}'
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

    db.all(`SELECT * FROM images WHERE user_id='${id}'`, (err, rows) => {
      if (err) {
        res.json(err);
      } else {
        res.render("images.html", {
          title: "IMAGES",
          tab: rows,
          tabB: [],
          tabC: [],
          tabD: [],
        });
      }
    });
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
