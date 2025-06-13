import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MIN_DIMENSIONS = { width: 200, height: 200 };
const MAX_DIMENSIONS = { width: 4096, height: 4096 };
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// const MAX_FILE_SIZE = 1000000;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// export const imageSchema = z.object({
//   image:
//     z.instanceof(File, { message: "Please select an image file.", })
//     .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
//     .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), "Only .jpg, .jpeg, .png and .webp formats are supported."
//     ),
// required_error: 'Name is required',
// });
export const imgSchema = z.object({
  filename: z
    .any({
      required_error: "Name is required",
    })
    .refine((filename) => filename?.[0]?.size <= MAX_FILE_SIZE, {
      message: `The image is too large. Please choose an image smaller than ${MAX_FILE_SIZE}.`,
    })
    .refine((filename) => ACCEPTED_IMAGE_TYPES.includes(filename?.[0]?.type), {
      message: "Please upload a valid image file (JPEG, PNG, or WebP).",
    }),
});

// import { z } from "zod";

// const formatBytes = (bytes: number, decimals = 2) => { if (bytes === 0) return "0 Bytes";

// const k = 1024;
// const dm = decimals < 0 ? 0 : decimals;
// const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
// const i = Math.floor(Math.log(bytes) / Math.log(k)); return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]; };
// formatBytes
//  as string;

// return res.status(400).json({ error: error.errors.map(error =>error.message) });

export const imageSchema = z.object({
  filename: z
    .instanceof(File, { message: "Please select an image file." })
    .transform((files) => files.length > 0 && files.item(0))
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `The image is too large. Please choose an image smaller than ${MAX_FILE_SIZE}.`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: "Please upload a valid image file (JPEG, PNG, or WebP).",
    }),
  // .refine((files) => new Promise((resolve) => { const reader = new FileReader();
  // reader.onload = (e) => {
  //   const img = new Image();
  //   img.onload = () => {
  //     const meetsDimensions = img.width >= MIN_DIMENSIONS.width && img.height >= MIN_DIMENSIONS.height && img.width <= MAX_DIMENSIONS.width && img.height <= MAX_DIMENSIONS.height;
  //     resolve(meetsDimensions);
  //   };
  //     img.src = e.target?.result};
  //     reader.readAsDataURL(files);
  // }),
  // {
  message: `The image dimensions are invalid. Please upload an image between ${MIN_DIMENSIONS.width}x${MIN_DIMENSIONS.height} and ${MAX_DIMENSIONS.width}x${MAX_DIMENSIONS.height} pixels.`,
  // }),
});
