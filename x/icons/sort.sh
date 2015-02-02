PATH=./icons/

renamer() {
	NUM=1
	for f in $PATH*
	do
		EXT="${f##*.}"
		/bin/mv "$f" "$PATH$MSG$NUM.$EXT"
		((NUM++))
	done
}

# RENAME FILES TO SOMETHING RANDOM - AVOID COLLISIONS
MSG="x-"
echo "Starting first round..."
renamer
echo "Done first round."
echo "Starting last round..."
MSG=""
renamer
echo "Done."