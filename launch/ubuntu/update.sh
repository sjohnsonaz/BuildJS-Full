#!/bin/bash
echo Update BuildJS

bash stop.sh

cd /etc/nodejs/BuildJS
git reset --hard
git pull origin master
npm install

bash start.sh
