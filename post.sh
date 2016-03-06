#----------
# Written by: Kalcifer Kandari
# Date: 4 March 2016 06:32:29
#----------

#---------- == Section
#========== == Function

#----------
# Post
#----------
# Publish website after a new post.
# This script is useful because it is important that these commands run in order, otherwise the remote repositories will get out of sync, and typing the commands out takes a long time.
#
# Run in '~/github/kalciferkandari/master' after creating a post.
#
# Example:
# sh post.sh "Commit message."

#==========
# Confirm Do
#==========
# Ask the user if the command should be done.
function confirmDo() {
    
    read -p "Run \"$1\"? [y/n] " text
    if [ $text = y ]; then
        #echo $arguments
        eval $1
    elif [ $text = n ]; then
        exit 0
    else
        confirmDo "$1"
    fi
    
}

confirmDo "git branch"

confirmDo "git add ."

confirmDo "git status"

confirmDo "git commit -m \"$1\""

confirmDo "git push origin master"

confirmDo "jekyll build"

confirmDo "cd ../gh-pages"

confirmDo "git branch"

confirmDo "git add ."

confirmDo "git commit -m " "\"$1\""

confirmDo "git push origin gh-pages"

confirmDo "cd ../master"

echo "Done."

exit 0