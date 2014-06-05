#!/bin/bash
echo Update BuildJS

bash ./stop.sh

cd ../../
git reset --hard
git pull origin master

cd launch/ant
ant install-production

cd ../ubuntu
bash ./start.sh
