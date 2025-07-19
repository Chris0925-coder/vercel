import User from "../models/index.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";
// import { ClientError, ServerError } from "../utils/errors.js";
// import { response } from '../utils/response.js';
// import { catchedAsync } from '../utils/catchedAsync.js';

export const register = async (req, res, next) => {
  const { name, email, password, username } = req.body;
  // console.log(User.User);
  let users = User.User;
  // console.log(users);
  try {
    const userFound = await users.findOne({ username });
    // console.log(userFound);

    if (userFound) {
      return res.status(401);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new users({
      name,
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();

    const token = await createAccesToken({ id: userSaved._id });

    // res.cookie("token", token);

    // res.cookie("id", userSaved._id);

    // res.cookie("name", userSaved.name);

    // res.cookie("username", userSaved.username);

    // res.cookie("email", userSaved.email);

    res.json({
      id: userSaved._id,
      name: userSaved.name,
      username: userSaved.username,
      email: userSaved.email,
      created: userSaved.createdAt,
      updated: userSaved.updatedAt,
    });

    // });
    // res.render('welcome.html',{title:'WELCOME', tab:data});
    // res.sendStatus(200);
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    let users = User.User;
    const userFound = await users.findOne({ username });
    if (!userFound) {
      return res.status(401).json({ error: "Usuario Incorrecto" });
      // throw new ClientError("Usuario no encontrado", 400);
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Contraseña Incorrecta" });
      // throw new ClientError("Contraseña Incorrecta", 400);
    }

    const token = await createAccesToken({ id: userFound._id });

    res.json(token);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const uptdatePassword = async (req, res, next) => {
  let { email, password } = req.body;

  let users = User.User;
  const userFound = await users.findOne({ email });

  if (!userFound) res.status(401).json({ error: "Email no encontrado" });

  const mail = userFound.email;
  console.log(mail);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "devwebjr7@gmail.com",
      pass: "",
    },
  });

  const mailOptions = {
    from: "devwebjr7@gmail.com",
    to: `${userFound.email}`,
    subject: "Hola desde Node.js",
    text: "Este es un mensaje enviado desde el servidor.",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Correo enviado:", info.response);
    }
  });

  // let transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     type: "OAuth2",
  //     user: process.env.MAIL_USERNAME,
  //     pass: process.env.MAIL_PASSWORD,
  //     clientId: process.env.OAUTH_CLIENTID,
  //     clientSecret: process.env.OAUTH_CLIENT_SECRET,
  //     refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  //   },
  // });

  next();
};

export const logout = async (req, res, next) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });

  next();
};

// export const profile = async (req, res) => {
// const username = req.cookies.username;
// const userFound = await User.findOne({username});
// console.log(userFound);

// let users = [{
//     id: userFound._id,
//     name: userFound.name,
//     username: userFound.username,
//     email: userFound.email,

// }];
// res.json({
//     id: userFound._id,
//     name: userFound.name,
//     username: userFound.username,
//     email: userFound.email,
//     created: userFound.createdAt,
//     updated: userFound.updatedAt
// });

// res.render('profile.html',{title:'PROFILE', tab:users,tabB:[]})
// };

// export const remove = async (req, res) => {
//     const {del} = req.body;

//     const userFound = await User.deleteOne(del);
// }

// export const login = catchedAsync(userLogin,'loginib.html');
