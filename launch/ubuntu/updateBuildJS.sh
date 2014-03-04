#!/bin/bash
echo Update BuildJS

forever stop /etc/nodejs/BuildJS/buildjsapp.js

cd /etc/nodejs/BuildJS
git reset --hard
git pull origin master
npm install

forever start /etc/nodejs/BuildJS/buildjsapp.js
