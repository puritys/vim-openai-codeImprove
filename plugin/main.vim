if exists('g:loaded_openai_codeImprove')
  finish
endif

let g:loaded_openai_codeImprove = 1

" Get base path
let s:pluginName = "vim_openai_codeImprove"

if !empty(glob($HOME . "/.vim/plugged/" . s:pluginName . "/plugin"))
    let s:path = $HOME . "/.vim/plugged/" . s:pluginName . "/plugin"
elseif !empty(glob($HOME . "/.vim/bundle/" . s:pluginName . "/plugin"))
    let s:path = $HOME . "/.vim/bundle/" . s:pluginName . "/plugin"
elseif !empty(glob("./plugin"))
    let s:path = "./plugin"
endif

let s:file= s:path . "/openai.py"
py3file `=s:file`
