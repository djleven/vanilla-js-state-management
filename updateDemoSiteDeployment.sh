#!/bin/sh
SUBTREE_FOLDER='public'

echo "---------------------- Update Subtree Github Pages branch------------------------------"
echo "This will update the remote subtree gh-pages branch with '${SUBTREE_FOLDER}' folder as it's root. Proceed?"
select yn in "Yes" "No"; do
  case $yn in
    Yes ) echo "---------Updating subtree branch...---------"
    echo "If this fails, chances are you don't have the git-subtree package installed on your system"
    git subtree push --prefix ${SUBTREE_FOLDER} origin gh-pages
    break;;
    No ) exit;;
  esac
done
