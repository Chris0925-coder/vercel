import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  let authHeader = req.headers["authorization"];
  let { tokenAdmin } = req.cookies;

  if (!tokenAdmin) {
    let tokenAuth = authHeader.split(" ")[1];

    if (!tokenAuth)
      return res.status(401).json({
        message: "No token, autorization denied",
      });

    jwt.verify(tokenAuth, TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });

      req.user = user;
    });
  } else {
    if (!tokenAdmin)
      return res.status(401).json({
        message: "No token, autorization denied",
      });
    jwt.verify(tokenAdmin, TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      } else {
        req.user = user;
      }
    });
  }
  console.log("Validing Token");
  next();
};
