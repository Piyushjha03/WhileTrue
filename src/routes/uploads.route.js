import express from "express";
import { upload } from "../middlewares/multer.middleware.js"
import { handleFileUpload } from "../controllers/uploads.controller.js";
import { getFile } from "../controllers/uploads.controller.js";

const router = express.Router();

router.post('/uploads', upload.single('file'), handleFileUpload);
router.get('/uploads',getFile)

export const uploadRouter = router