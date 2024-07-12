import { GoogleGenerativeAI } from "@google/generative-ai";
import { getChapter } from "../model/chapters/chapters.mongo.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const queryController = async (req, res) => {
  try {
    const videoID = req.body.videoID;

    const vDetails = await getChapter(videoID);

    const systemPrompt = `You are a helpful and knowledgeable assistant for an educational platform. You will assist students by answering questions specifically related to the content of the video they have just watched. Here is the transcript of the video: ${vDetails.transcript}. Please ensure that your responses are directly relevant to the video's transcript.`;
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      systemInstructions: systemPrompt,
    });

    const response = await model.generateContent(req.body.query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
