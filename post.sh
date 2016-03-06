#----------
# Written by: Kalcifer Kandari
# Date: 4 March 2016 06:32:29
#----------

#---------- == Section
#========== == Function

#----------
# Post
#----------
# Publish website.
# This script is useful because it is important that these commands run in order, otherwise the remote repositories will get out of sync, and typing the commands out takes a long time. The confirmations just allows errors to be corrected without other commands running after.
#
# Run in '~/github/kalciferkandari/master' after updating the site.
#
# Example:
# sh post.sh "Commit message."

# `echo` a new line.
echo

#==========
# Confirm Do
#==========
# Ask the user if the command should be done.
function confirmDo() {
    
    # Ask user to for a response.
    echo "Run \`$1\`?"
    read -p "[y/s/e (yes/skip/exit)] " text # `-p` adds a prompt as `echo -n ""` doesn't seem to work.
    
    if [ $text = y ]; then
    
        eval $1
        echo "Done \"$1\".\n"
        
    elif [ $text = e ]; then
    
        echo "Exiting."
        exit 0
        
    elif [ $text = s ]; then
    
        echo "Skipping.\n"
        
    else
    
        echo "Enter a valid letter."
        confirmDo "$1"
        
    fi
    
}

confirmDo "cd $HOME/github/kalciferkandari/master"

confirmDo "git branch"

confirmDo "git add ."

confirmDo "git status"

confirmDo "git commit -m \"$1\""

confirmDo "git push origin master"

confirmDo "jekyll build"

confirmDo "cd ../gh-pages"

confirmDo "git branch"

confirmDo "git add ."

confirmDo "git status"

confirmDo "git commit -m \"$1\""

confirmDo "git push origin gh-pages"

confirmDo "cd ../master"

confirmDo "git branch"

echo "Done. Exiting."

exit 0