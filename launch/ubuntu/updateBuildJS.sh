#!/bin/bash
echo Update BuildJS

stop startupBuildJS

cd /etc/nodejs/BuildJS
git reset --hard
git pull origin master
npm install

start startupBuildJS
