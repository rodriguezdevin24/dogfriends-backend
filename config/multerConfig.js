const multer = require('multer');
const path = require('path');

// Define storage configuration
const storage = multer.diskStorage({
  destination: 'uploads/', // Directory to store uploaded files
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname); // Extract file extension from original file name
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension); // Append file extension
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

console.log("Upload:", upload);
console.log("Storage:", storage);
console.log("Multer:", multer);

module.exports = upload;
