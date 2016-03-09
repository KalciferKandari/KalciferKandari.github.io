#----------
# Date: 7 May 2014 11:05:44
#----------
# Date: 6 March 2016 10:50:32

#----------
# New Post
#----------
# Initialises a new post into "_posts".
#
# Could run this from an AppleScript
#
# Example:
# sh newPost.sh 

# The `date` is specific to OSX, but does use the same date formatting. `-j` stops the command from setting the date, and `-f` converts a date with a specified format to another.
date1=$(date -j "+%d %m %Y %H %M %S")
date2=$(date -j -f "%d %m %Y %H %M %S" "$date1" "+%-d %B %Y %H:%M:%S")
date3=$(date -j -f "%d %m %Y %H %M %S" "$date1" "+%Y/%m/%d %H:%M:%S")
date4=$(date -j -f "%d %m %Y %H %M %S" "$date1" "+%Y-%m-%d-%H-%M-%S")

if [ -f "_posts/$date4.md" ]; then
    echo "A file with the same name already exists, please try again."
    exit 0
fi

echo "---
#----------
# Written by: Kalcifer Kandari
# Date: $date2
#----------
date: $date3
title: \"\"
author: \"Kalcifer_Kandari\"
excerpt: \"\"
---
" > "_posts/$date4.md"

exit 0