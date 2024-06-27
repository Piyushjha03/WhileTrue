import { addChapter } from "../model/chapters/chapters.mongo.js";
import { getCourse } from "../model/courses/courses.model.js";

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
