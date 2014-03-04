#!/bin/bash
echo Update BuildJS

cd /etc/nodejs/BuildJS

forever stop app.js

git reset --hard
git pull origin master
npm install

forever start app.js
