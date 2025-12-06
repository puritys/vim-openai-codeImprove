import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import path from 'path';

// Read API key
const homePath: string = path.resolve(process.env.HOME || process.env.USERPROFILE || '', '.gemini_api_key');
const apiKey: string = fs.readFileSync(homePath, 'utf8').trim();
const ai = new GoogleGenAI({ apiKey: apiKey });

async function optimizeSelectedCode(selectedCode: string): Promise<string> {


    const model: string = 'gemini-2.5-flash';
    const prompt: string = 'You are a professional engineer, Please optimize the following code and provide short response:\n' + selectedCode;

    try {
        const response = await ai.models.generateContent({
          model: model,
          contents: prompt,
        });

        return response.text;
    } catch (error: any) {
        console.error(`Error: Request failed  ${error}`);
        return '';
    }
}

const selectedCode = fs.readFileSync("/tmp/vim-openai-codeImprove-tmp.txt", {encoding:'utf8', flag:'r'});
if (selectedCode) {
    optimizeSelectedCode(selectedCode).then(optimizedCode => {
        if (optimizedCode) {
            console.log(`/*\n${optimizedCode}\n*/`);
        }
    });
}
