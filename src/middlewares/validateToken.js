import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  let { token } = req.cookies;

  if (!token) {
    // return res.render("login.html", {
    //   title: "Login",
    //   message: [],
    // });
    return res.status(401).json({ message: "No token, autorization denied" });
  } else {
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
        // return res.render("login.html", {
        //   title: "Login",
        //   message: "Invalid token",
        // });
      } else {
        // res.cookie("token", token);
        // res.render("employee.html", { title: "Login", message: [] });
        // let { user } = req.cookies;
        req.user = user;
        // res.cookie(user)
        // console.log(user);
      }
    });
  }
  console.log("Validing Token");
  next();
};
