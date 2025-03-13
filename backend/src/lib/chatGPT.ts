import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.CHATGPT_API_KEY
});

export const ChatGPT = new OpenAIApi(configuration);
