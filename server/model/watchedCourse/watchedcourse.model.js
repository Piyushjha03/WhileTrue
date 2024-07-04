import { WatchedCourse } from "./watchedcourse.mongo.js";

export async function getWatchedCourse({ clerkID, courseID }) {
  try {
    const watchedCourse = await WatchedCourse.findOne({
      clerkID,
      courseID,
    });
    return watchedCourse;
  } catch (error) {
    throw error;
  }
}

export async function addWatchedCourse(watchedCourseDetails) {
  try {
    const { clerkID, courseID, watched } = watchedCourseDetails;
    const findCourse = await getWatchedCourse({ clerkID, courseID });

    if (findCourse) {
      findCourse.watched.push(watched);
      await findCourse.save();
      return findCourse;
    } else {
      const watchedCourse = await WatchedCourse.create({ clerkID, courseID });
      watchedCourse.watched.push(watched);
      await watchedCourse.save();
      return watchedCourse;
    }
  } catch (error) {
    throw error;
  }
}

export async function updateWatchedCourse(watchedCourseDetails) {
  try {
    const { clerkID, courseID, watched } = watchedCourseDetails;
    const findCourse = await getWatchedCourse({ clerkID, courseID });

    if (findCourse) {
      findCourse.watched.remove(watched);
      await findCourse.save();
      return findCourse;
    } else {
      throw new Error("Course not found");
    }
  } catch (error) {
    throw error;
  }
}
