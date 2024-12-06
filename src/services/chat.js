
import {  OpenAI } from "openai";

const openai = new OpenAI({apiKey : ''});

const response = await openai.get({
  model: "text-davinci-003",
  prompt: "Escreva um poema sobre a natureza",
  max_tokens: 1024,
  n: 1,
  stop: null,
  temperature: 0.5,
});

console.log(response.data.choices[0].text.trim());
