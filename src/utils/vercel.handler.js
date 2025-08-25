import { put } from "@vercel/blob";

// export async function PUT(request, response, next) {
//   const files = await request.file;
//   const pfile = JSON.stringify(files);
//   console.log(files);
//   const blob = await put(files.filename, pfile, {
//     access: "public",
//     token: process.env.BLOB_READ_WRITE_TOKEN,
//   });

//   console.log(blob);

//   Response.json(blob);
//   next();
// }

export async function PUT(req, res, next) {
  const files = await req.file;
  const fileContent = files.buffer.toString();
  console.log(fileContent);
  try {
    const blob = await put(files.filename, fileContent, {
      access: "public", // or "private" depending on your needs
      token: process.env.BLOB_READ_WRITE_TOKEN, // Ensure this token is set in your environment variables
    });

    console.log("File uploaded successfully:", blob.url);
    return Response.json(blob); // Returns the public URL of the uploaded file
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
