// pages/api/generate-resume.js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {

  res.status(200).json({ message: "Connected TO Cover Letter builder!" });
}
 