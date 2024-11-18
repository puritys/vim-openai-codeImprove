import vim
import json
import requests
import os
from pathlib import Path

def optimize_selected_code():
    """
    Python Vim Plugin to call OpenAI API for optimizing a selected block of code.
    Requires `requests` library for HTTP requests and assumes that you have
    an API key for accessing the OpenAI API.
    """
    vim.command('echom "Waiting (need ~/.openai_api_key)... start to call openai about how to improve code."')

    # Store the visual selection in a variable
    start = vim.eval('getpos("\'<")')
    end = vim.eval('getpos("\'>")')
    lines = vim.eval('getline({}, {})'.format(start[1], end[1]))
    selected_code = "\n".join(lines)


    # Read API key
    home_path = os.path.expanduser("~")
    api_key = Path(home_path + "/.openai_api_key").read_text().strip()

    api_url = 'https://api.openai.com/v1/chat/completions'
    model = 'gpt-4o-mini'
    prompt = 'Please optimize the following code:\n' + selected_code

    json_payload = {
        'model': model,
        'messages': [
            {
                'role': 'system',
                'content': 'you are a professional engineer'
            },
            {
                'role': 'user',
                'content': prompt,
            },
        ],
#        'max_tokens': 500
    }


    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}'
    }

    # Make the API request using requests library
    response = requests.post(api_url, headers=headers, json=json_payload)

    if response.status_code == 200:
        parsed_response = response.json()
        if 'choices' in parsed_response:
            optimized_code = parsed_response['choices'][0]['message']['content']
        else:
            print("Error: Could not retrieve optimized code")
            return
    else:
        print(f"Error: Request failed with status code {response.status_code}")
        return

    # Replace the selected code with the optimized code
    optimized_lines = json.dumps(["/*"] + optimized_code.split("\n") + ["*/"])

    # Insert the optimized code after the selected code
    vim.command('call append({}, {})'.format(end[1], optimized_lines))

    # Print a success message
    vim.command('echom "Code optimized successfully!"')

# Create a mapping to call the function in visual mode
vim.command("xnoremap <silent> <Leader>ai :py3 optimize_selected_code()<CR>")
