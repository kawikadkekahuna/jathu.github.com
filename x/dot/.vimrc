" @jathu was here

if !isdirectory(expand("~/.vim/bundle/vundle"))
	call system("git clone https://github.com/gmarik/vundle.git ~/.vim/bundle/vundle")
endif

set nocompatible
filetype off
set rtp+=~/.vim/bundle/vundle
call vundle#rc()

Bundle 'scrooloose/nerdtree'
Bundle 'kchmck/vim-coffee-script'

if !isdirectory(expand("~/.vim/bundle/vim-airline"))
	execute 'silent BundleInstall'
	execute 'silent q'
endif

filetype plugin indent on
syntax on

"
"
" CONFIGS
"
"


" Remap NERDTree to Ctrl+n
map <silent> <C-n> :NERDTree<cr>

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
