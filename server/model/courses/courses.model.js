import { Course } from "./courses.mongo.js";

export async function getCourse(courseId) {
  try {
    const course = await Course.findById(courseId);
    return course;
  } catch (error) {
    throw error;
  }
}

export async function postCourse(courseDetails) {
  try {
    const postcoursestatus = await Course.create(courseDetails);
    return postcoursestatus;
  } catch (error) {
    throw error;
  }
}

export async function getAllCourses() {
  try {
    const courses = await Course.find();
    return courses;
  } catch (error) {
    throw error;
  }
}
