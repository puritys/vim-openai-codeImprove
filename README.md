
![](https://puritys.github.io/gp-image/src/github/openAiImprove1.gif)

- store openai api key in the file `~/.openai_api_key`
- select code then input `<leader>ai` (,ai) will call open ai about how to improve the code you selected


Default is using nodejs version so you have to install nodejs first (suggest using up than version 16), or you could set `let g:vim_openai_codeImprove_usePython3=1`

# To use gmini api
- you have to install the veriosn of nodejs be larger than 18
- And have correct gemini api key envionment:`export GEMINI_API_KEY=ixxxxx`
- add vim config:

```
let g:vim_openai_codeImprove_enableGemini = 1
```
