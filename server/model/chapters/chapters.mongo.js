import { Chapter } from "./chapters.model.js";

export async function addChapter(chapterDetails) {
  try {
    const chapter = await Chapter.create(chapterDetails);
    return chapter;
  } catch (error) {
    throw error;
  }
}

export async function getChapter(chapterID) {
  try {
    const chapter = await Chapter.findById(chapterID);
    return chapter;
  } catch (error) {
    throw error;
  }
}
