import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  let authHeader = req.headers["authorization"];
  let { token } = req.cookies;

  if (!authHeader) {
    if (!token)
      return res.status(401).json({
        message: "No token, autorization denied (*)",
        token: req.cookies,
      });

    if (token) {
      jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Invalid token" });
        } else {
          req.user = user;

          // next();
        }
      });
    }
  } else {
    let tokenAuth = authHeader.split(" ")[1];

    if (!tokenAuth)
      return res.status(401).json({
        message: "No token, autorization denied",
        tokenAuth: tokenAuth,
      });

    if (tokenAuth) {
      jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Invalid token" });
        } else {
          req.user = user;
          // next();
        }
      });
    }
  }
  console.log("Validing Token");
  next();
};
