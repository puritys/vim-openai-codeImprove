import axios from 'axios';
import fs from 'fs';
import path from 'path';


async function optimizeSelectedCode(selectedCode: string): Promise<string> {

    // Read API key
    const homePath: string = path.resolve(process.env.HOME || process.env.USERPROFILE || '', '.openai_api_key');
    const apiKey: string = fs.readFileSync(homePath, 'utf8').trim();

    const apiUrl: string = 'https://api.openai.com/v1/chat/completions';
    const model: string = 'gpt-4o-mini';
    const prompt: string = 'Please optimize the following code:\n' + selectedCode;

    const jsonPayload = {
        model: model,
        messages: [
            {
                role: 'system',
                content: 'you are a professional engineer'
            },
            {
                role: 'user',
                content: prompt,
            }
        ]
//        max_tokens: 500,
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

    try {
        // Make the API request using axios
        const response = await axios.post(apiUrl, jsonPayload, { headers });

        if (response.status === 200 && response.data && response.data.choices) {
            return response.data.choices[0].message.content;
        } else {
            console.error("Error: Could not retrieve optimized code");
            return '';
        }
    } catch (error: any) {
        console.error(`Error: Request failed with status code ${error.response ? error.response.status : 'unknown'}`);
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
