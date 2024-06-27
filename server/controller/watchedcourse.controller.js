import {
  addWatchedCourse,
  getWatchedCourse,
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
