import {GoogleGenerativeAI} from '@google/generative-ai'
import prompt from 'prompt-sync'
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const quest = async function run(){
const model = genAI.getGenerativeModel({model:"gemini-pro"})


const question = prompt('Ask A Doubt?');
const result = await model.generateContent(question);
const response = await result.response;
const text = response.text();
console.log(text);
}

export {quest}