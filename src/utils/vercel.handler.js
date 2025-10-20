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
  // console.log(!files);
  if (!files) {
    // files = existData.rows[0].images;
    next();
  } else {
    try {
      const fileContent = files.buffer;

      const blob = await put(files.originalname, fileContent, {
        access: "public", // or "private" depending on your needs
        token: process.env.BLOB_READ_WRITE_TOKEN, // Ensure this token is set in your environment variables
        allowOverwrite: true,
      });
      // console.log("File uploaded successfully:", blob.url);
      // return Response.json(blob);
      // Returns the public URL of the uploaded file
      // return blob.url;
      next();
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }
}

// export async function DELETE(req) {
//   const { searchParams } = new URL(req.url);
//   const urlToDelete = searchParams.get("url");
//   await del(urlToDelete);

//   return new Response();
// }
