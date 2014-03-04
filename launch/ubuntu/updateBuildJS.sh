#!/bin/bash
echo Update BuildJS

forever stop /etc/nodejs/Buildjs/buildjsapp.js

cd /etc/nodejs/BuildJS
git reset --hard
git pull origin master
npm install

forever start /etc/nodejs/Buildjs/buildjsapp.js
