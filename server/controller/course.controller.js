import {
  getAllCourses,
  postCourse,
  getCourse,
} from "../model/courses/courses.model.js";

export async function httpGetAllCourse(req, res) {
  try {
    const courses = await getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function httpGetCourse(req, res) {
  try {
    const course = await getCourse(req.query.id);
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createCourse(req, res) {
  try {
    const courseDetails = req.body;
    const postcoursestatus = await postCourse(courseDetails);
    console.log("====================================");
    console.log(postcoursestatus);
    console.log("====================================");
    if (postcoursestatus) {
      res.status(200).json({ message: "Course created successfully" });
    } else {
      res.status(400).json({ message: "Error creating course" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
