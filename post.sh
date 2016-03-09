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
# This script is useful because it is important that these commands run in order, otherwise the remote repositories will get out of sync, and typing the commands out takes a long time. The confirmations just allows errors to be corrected without other commands running after. The commands can be run without confirmation, which is very quick, but much less could result in problems if the commands fail.
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
    
    if [ "$text" == "y" ]; then
    
        eval $1
        echo "Done \"$1\".\n"
        
    elif [ "$text" == "e" ]; then
    
        echo "Exiting."
        exit 0
        
    elif [ "$text" == "s" ]; then
    
        echo "Skipping.\n"
        
    else
    
        echo "Enter a valid letter."
        confirmDo "$1"
        
    fi
    
}

#==========
# If All
#==========
function ifAll() {
    
    if [ "$1" == "true" ]; then
        
        echo "Running \`$2\`."
        eval $2
        echo "Done \"$2\".\n"
        
    else
        
        confirmDo "$2"
        
    fi
    
}

#==========
# Confirm All
#==========
# This needs to be a function because if the users inputs something invalid, then the function needs to be called within itself without calling the ifAll commands.
# Could probably merge confirmDo and confirmAll somehow.
function confirmAll() {
    
    # Ask user to for a response.
    echo "Do all commands with no confirmation? (Not recommended)."
    read -p "[y/n/e (yes/no/exit)] " text1
    
    if [ "$text1" == "y" -o "$text1" == "n" ]; then
        
         # If the answer is either "y" or "n". These answers are the only one where the ifAll commands are applicable, so they need to be within this condition's block.
        
        all=""
        
        if [ "$text1" == "y" ]; then
            
            echo "Doing all commands with no confirmation.\n"
            all="true"
            
        elif [ "$text1" == "n" ]; then
            
            echo "Confirming commands.\n"
            all="false"
            
        fi
        
        ifAll $all "git branch"
        
        ifAll $all "git add ."
        
        ifAll $all "git status"
        
        ifAll $all "git commit -m \"$1\""
        
        ifAll $all "git push origin master"
        
        ifAll $all "jekyll build"
        
        ifAll $all "cd ../gh-pages"
        
        ifAll $all "git branch"
        
        ifAll $all "git add ."
        
        ifAll $all "git status"
        
        ifAll $all "git commit -m \"$1\""
        
        ifAll $all "git push origin gh-pages"
        
        ifAll $all "cd ../master"
        
        ifAll $all "git branch"
    
    elif [ "$text1" == "e" ]; then
        
        echo "Exiting."
        exit 0
        
    else
        
        echo "Enter a valid letter."
        confirmAll "$1"
        
    fi
    
}

confirmAll $1

echo "Done. Exiting."

exit 0