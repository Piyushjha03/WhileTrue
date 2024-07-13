import { Chapter } from "../model/chapters/chapters.model.js";
import { addChapter, getChapter } from "../model/chapters/chapters.mongo.js";
import { getCourse } from "../model/courses/courses.model.js";

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
    await Chapter.findByIdAndUpdate(req.body.chapterID, {
      videoStatus: "queued",
    });

    videoController(req, res, async (err) => {
      if (err) {
        await Chapter.findByIdAndUpdate(req.body.chapterID, {
          videoStatus: "cancelled",
        });
        return res.status(500).json({ error: err.message, uploaded: "failed" });
      }
    });
  } catch (error) {
    await Chapter.findByIdAndUpdate(req.body.chapterID, {
      videoStatus: "cancelled",
    });
    return res.status(500).json({ error: error.message, uploaded: "failed" });
  }
};

export const httpUpdateChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    return res.status(200).json(chapter);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
