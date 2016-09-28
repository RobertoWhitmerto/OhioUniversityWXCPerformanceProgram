#!/usr/bin/env bash

if [ "$#" -ne 1 ]; then
    echo "Error: Usage: ./deploy.sh \"COMMIT MESSAGE\""
fi

commit=$1
gcommand="git commit -m "\""$commit"\"
echo $gcommand

git add .

eval $gcommand

eb deploy
