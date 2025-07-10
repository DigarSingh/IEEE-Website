const express = require('express');
const router = express.Router();
const { 
  uploadCertificate, 
  getUserCertificates, 
  getAllCertificates, 
  downloadCertificate, 
  deleteCertificate 
} = require('../controllers/certificateController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setup storage for certificate uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads/certificates');
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'cert-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only PDF files
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Routes
router.post('/upload', protect, isAdmin, upload.single('certificate'), uploadCertificate);
router.get('/user', protect, getUserCertificates);
router.get('/user/:userId', protect, getUserCertificates);
router.get('/', protect, isAdmin, getAllCertificates);
router.get('/download/:id', protect, downloadCertificate);
router.delete('/:id', protect, isAdmin, deleteCertificate);

module.exports = router;
