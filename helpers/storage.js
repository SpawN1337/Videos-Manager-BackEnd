const multer = require('multer')
const fs = require('fs');
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = req.body.disk + '/videos';
    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) {
        cb(err);
      } else {
        cb(null, folderPath);
      }
    });
  },
  filename: (req, file, cb) => {
    const mimeType = file.mimetype.split('/');
    const fileType = mimeType[1];
    const fileName = file.originalname + '.' + fileType;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['video/mp4', 'video/mpeg ', 'video/3gpp'];
  allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

const storage = multer({ storage: diskStorage, fileFilter: fileFilter }).single(
  'video'
);

module.exports = storage;