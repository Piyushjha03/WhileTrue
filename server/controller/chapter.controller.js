import { addChapter, getChapter } from "../model/chapters/chapters.mongo.js";
import { getCourse } from "../model/courses/courses.model.js";
import { uploadtomulter } from "./multer.middleware.js";
import { videoController } from "./videoController.js";

export const httpAddChapter = async (req, res) => {
  try {
    const chapter = await addChapter(req.body);
    const courseForChapter = await getCourse(req.body.courseID);
    courseForChapter.chapters.push(chapter._id);
    await courseForChapter.save();

    return res.status(200).json(chapter);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const httpGetChapter = async (req, res) => {
  try {
    const chapter = await getChapter(req.body.chapterID);
    return res.status(200).json(chapter);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const httpAddVideo = async (req, res) => {
  try {
    videoController(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err.message, uploaded: "failed" });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message, uploaded: "failed" });
  }
};
