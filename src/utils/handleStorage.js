import multer from "multer";
import os from "os";

const fileFilter = (req, files, cb) => {
  // if (file.fieldname === "resume") {
  //   if (
  //     file.mimetype === 'application/pdf' ||
  //     file.mimetype === 'application/msword' ||
  //     file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  //   ) {
  //     cb(null, true);
  //   } else {
  //     cb(null, false);
  //   }
  // } else {
  if (
    files.mimetype === "image/png" ||
    files.mimetype === "image/jpg" ||
    files.mimetype === "image/jpeg" ||
    files.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
  // }
};

const musicFilter = (req, file, cb) => {
  if (file.mimetype === "audio/mpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const videoFilter = (req, file, cb) => {
  if (file.mimetype === ".mp4") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.memoryStorage({
  // destination: function (req, file, cb) {
  //   const pathStorage = `src/storage/img`;
  //   cb(null, pathStorage);
  // },
  destination: (req, file, cb) => {
    const tempDir = os.tmpdir();
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const filename = `file-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const storageUpdate = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `src/storage/img`;
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const filename = `file-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const music = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `src/storage/music`;
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const filename = `file-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const video = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `src/storage/videos`;
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const filename = `file-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

export const uploadMiddleware = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

export const uploadMiddlewareUpdate = multer({
  storage: storageUpdate,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

export const uploadMiddlewareMusic = multer({
  storage: music,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: musicFilter,
});

export const uploadMiddlewareVideo = multer({ storage: video });
