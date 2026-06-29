import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // if (!authHeader) {
  let { token } = req.cookies;

  if (!token)
    return res.status(401).json({ message: "No token, autorization denied" });

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
  // } else {
  let tokenAuth = authHeader.split(" ")[1];

  if (!tokenAuth)
    return res.status(401).json({ message: "No token, autorization denied" });

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
  // }
  console.log("Validing Token");
  next();
};
