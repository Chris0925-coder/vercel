import { put } from "@vercel/blob";

export async function PUT(request, response, next) {
  const files = await request.file;
  // const form = await request.formData();
  // const file = form.get("file");
  // const file = request.body;
  const pfile = JSON.stringify(files);
  console.log(files);
  const blob = await put(files.filename, pfile, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  console.log(blob);

  Response.json(blob);
  next();
}
