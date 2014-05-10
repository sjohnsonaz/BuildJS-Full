#!/bin/bash
echo Update BuildJS

bash /etc/nodejs/BuildJS/launch/ubuntu/stop.sh

cd /etc/nodejs/BuildJS
git reset --hard
git pull origin master
npm install --production
bower install --production

bash /etc/nodejs/BuildJS/launch/ubuntu/start.sh
