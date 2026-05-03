import multer from "multer";
import { uploadMiddleware } from "./handleStorage.js";

export class ClientError extends Error {
  constructor(message, status = 400) {
    (super(message), (this.statusCode = status));
  }
}

export class ServerError extends Error {
  constructor(message, status = 500) {
    (super(message), (this.statusCode = status));
  }
}

const uploadImg = uploadMiddleware.single("filename");

export const multerErr = (req, res, next) => {
  uploadImg(req, res, function (err) {
    // console.error(err);
    if (err instanceof multer.MulterError) {
      console.error("ErrMulter: ", err.code);
      if (err.code === "LIMIT_FILE_SIZE") {
        console.error("File size too large");

        return res.send(err);
      }
    } else if (err) {
      console.error(err);
    }
    next();
  });
};
