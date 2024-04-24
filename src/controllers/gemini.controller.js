import {GoogleGenerativeAI} from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const doubtSol = async function run(req,res,next){
    try {
        const model = genAI.getGenerativeModel({model:"gemini-pro"})


const question = req.body.question;
const result = await model.generateContent(question);
const response = result.response;
const text = response.text();
console.log(text);
return res.json({text})
    } catch (error) {
        console.log(error);
    }


//next()
}

export {doubtSol}
