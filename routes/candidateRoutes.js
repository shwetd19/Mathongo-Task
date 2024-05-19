const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); // multer to store files in memory

const candidateController = require("../controllers/candidateController");

router.post("/upload", upload.single("file"), candidateController.uploadCandidates);
router.get("/return", candidateController.getAllCandidates);
router.get("/emails", candidateController.getAllCandidateEmails); // New route

module.exports = router;
