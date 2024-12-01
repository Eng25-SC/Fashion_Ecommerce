import multer from 'multer';

// Set storage options with destination and filename
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname); // Store with original filename
    }
})

// Initialize`upload` with the defined storage options
const upload = multer({ storage });

export default upload;