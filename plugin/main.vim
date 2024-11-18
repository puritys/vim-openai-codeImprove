if exists('g:loaded_openai_codeImprove')
  finish
endif

let g:loaded_openai_codeImprove = 1

" Get base path
let s:pluginName = "vim-openai-codeImprove"

if !empty(glob($HOME . "/.vim/plugged/" . s:pluginName . "/plugin"))
    let s:path = $HOME . "/.vim/plugged/" . s:pluginName . "/plugin"
elseif !empty(glob($HOME . "/.vim/bundle/" . s:pluginName . "/plugin"))
    let s:path = $HOME . "/.vim/bundle/" . s:pluginName . "/plugin"
elseif !empty(glob("./plugin"))
    let s:path = "./plugin"
endif

if exists('g:vim_openai_codeImprove_usePython3') && g:vim_openai_codeImprove_usePython3 == "1"

    let s:file= s:path . "/openai.py"
    py3file `=s:file`

else
    let s:file= s:path . "/dist/openai.js"
    let s:tmpFile = "/tmp/vim-openai-codeImprove-tmp.txt"
    function! OptimizeSelectedCode()
        echom "Waiting (need ~/.openai_api_key)... start to call openAI about how to improve code."

        " Store the visual selection in a variable
        let l:start = getpos("'<")
        let l:end = getpos("'>")
        let l:lines = getline(l:start[1], l:end[1])
        let l:selected_code = join(l:lines, "\n")
        if empty(l:lines)
            echom "Error: selected code is empty"
            return;
        endif

        call writefile(l:lines, s:tmpFile)
        " Write the selected code to the Node.js script and get the response
        let l:optimized_code = system('node '.s:file )
        " Insert the optimized code after the selected code
        if !empty(l:optimized_code)
            let l:optimized_lines = split(l:optimized_code, "\n")
            call append(l:end[1], l:optimized_lines)
            echom "Code optimized successfully!"
        else
            echom "Error: Failed to optimize code"
        endif
        call delete(s:tmpFile)
    endfunction
    xnoremap <silent> <Leader>ai :<C-U>call OptimizeSelectedCode()<CR><CR>

endif
