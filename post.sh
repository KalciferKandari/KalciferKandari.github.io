# Date: 4 March 2016 06:32:29

# Run in '~/github/kalciferkandari' after creating a post. Make sure the branch of the folder 'master' is master before running.

# Example:
# post.sh "Commit message."

echo "cd master"
cd master

echo "jekyll build --destination ../gh-pages"
jekyll build -- destination ../gh-pages

echo "git commit -am "$1
git commit -am "$1"

echo "git push origin master"
git push origin master

echo "git cd ../gh-pages"
git cd ../gh-pages

echo "git checkout gh-pages"
git checkout gh-pages

echo "git commit -am "$1""
git commit -am "$1"

echo "git push origin gh-pages"
git push origin gh-pages

echo "cd ../master"
cd ../master

echo "checkout master"
checkout master

echo "cd ../"
cd ../