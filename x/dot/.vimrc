 @jathu was here

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
Plugin 'chriskempson/base16-vim'
Plugin 'ryanss/vim-hackernews'

call vundle#end()
filetype plugin indent on


" Remap NERDTree to Ctrl+n
map <silent> <C-n> :NERDTree<cr>
" Remap pane switch
noremap <Space><Up>    <C-w>k
noremap <Space><Down>  <C-w>j
noremap <Space><Left>  <C-w>h
noremap <Space><Right> <C-w>l

" Style
syntax on
set background=dark
colorscheme base16-chalk 

" Other configs
set tabstop=2						" Tab to 2 spaces
set shiftwidth=2				" Tab to 2 spaces
set softtabstop=2				" Tab to 2 spaces
set autoread						" Autoload buffer when file changes
set clipboard=unnamed		" Use system clipboard
set encoding=utf-8			" default encoding
set noswapfile					" No buffer swap files
set number							" Show line numbers
set showcmd							" Show commnad line at the bottom
set ignorecase					" Ignore case for patter matching
set incsearch						" 'live' search resuts
set splitright					" Open new panes to the right
