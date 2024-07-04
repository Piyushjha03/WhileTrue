import {
  addWatchedCourse,
  getWatchedCourse,
  updateWatchedCourse,
} from "../model/watchedCourse/watchedcourse.model.js";

export const httpGetWatchedCourse = async (req, res) => {
  try {
    const watchedCourse = await getWatchedCourse(req.body);
    res.status(200).json(watchedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const httpAddWatchedCourse = async (req, res) => {
  try {
    const watchedCourse = await addWatchedCourse(req.body);
    res.status(200).json(watchedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const httpUpdateWatchedCourse = async (req, res) => {
  console.log("====================================");
  console.log(req.body);
  console.log("====================================");
  try {
    const watchedCourse = await updateWatchedCourse(req.body);
    res.status(200).json(watchedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
