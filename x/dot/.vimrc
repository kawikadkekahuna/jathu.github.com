" @jathu was here

if !isdirectory(expand("~/.vim/bundle/vundle"))
	call system("git clone https://github.com/gmarik/vundle.git ~/.vim/bundle/vundle")
endif

set nocompatible
filetype off
set rtp+=~/.vim/bundle/vundle
call vundle#begin()

Plugin 'gmarik/Vundle.vim'
Plugin 'scrooloose/nerdtree'
Plugin 'kchmck/vim-coffee-script'
Plugin 'ryanss/vim-hackernews'
Plugin 'godlygeek/tabular'
Plugin 'plasticboy/vim-markdown'
Plugin 'chriskempson/base16-vim'

call vundle#end()
filetype plugin indent on


" Remap NERDTree to Ctrl+n
map <silent> <C-n> :NERDTree<cr>

" Remap pane switch
noremap <Space> <C-w>
noremap <Space><Up> <C-w>k
noremap <Space><Down> <C-w>j
noremap <Space><Left> <C-w>h
noremap <Space><Right> <C-w>l

" Remap HackerNews plugin
map :HN :HackerNews

" Highlight search
nnoremap <silent> n n:call HLNext(0.5)<cr>
nnoremap <silent> N N:call HLNext(0.5)<cr>
function! HLNext(blinktime)
	set invcursorline
	redraw
	exec 'sleep '.float2nr(a:blinktime * 1000).'m'
	set invcursorline
	redraw
endfunction

" Start new lines without entering insert mode
nmap O  o<Esc>

" Style
syntax on
set background=dark
colorscheme chalk
" Delete trailing white spaces
autocmd BufWritePre * :%s/\s\+$//e

" Tab to 2 spaces
set tabstop=2
set shiftwidth=2
set softtabstop=2
" Autoload buffer when file changes
set autoread
" Use system clipboard
set clipboard=unnamedplus
" Default encoding
set encoding=utf-8
" No buffer swap files
set noswapfile
" Show line numbers
set number
" Show command line at the bottom
set showcmd
" Ignore case for pattern matching
set ignorecase
" 'live' search results
set incsearch
" Open new panes to the right
set splitright
"	Auto indent
set autoindent
" Allow scrolling
set mouse=a
" No autoindent on paste
set paste
" Mark 80 char line
set textwidth=80
set colorcolumn=+1
" Spell Check
set spell spelllang=en_us
autocmd BufRead,BufNewFile *.md setlocal spell
autocmd BufRead,BufNewFile *.markdown setlocal spell
" Turn off folding
set nofoldenable
