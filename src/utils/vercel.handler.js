import { put } from "@vercel/blob";
// import { config } from "dotenv";

export function b() {
  return async (req, res, next) => {
    let files = req.file;
    // let { title, paragraph, link } = req.body;
    let dest = files.filename;
    const blob = await put(dest, files, {
      access: "public", // o 'private'
      token: process.env.BLOB_READ_WRITE_TOKEN, // Usa el token de la variable de entorno
    });
    console.log(blob);
  };
}
