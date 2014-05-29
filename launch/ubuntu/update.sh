#!/bin/bash
echo Update BuildJS

bash /etc/nodejs/BuildJS/launch/ubuntu/stop.sh

cd /etc/nodejs/BuildJS
git reset --hard
git pull origin master
npm install --production
bower install --production --allow-root
lessc /etc/nodejs/BuildJS/public/Resources/less/base.less /etc/nodejs/BuildJS/public/Resources/css/base.css
node /etc/nodejs/BuildJS/minify.js
bash /etc/nodejs/BuildJS/launch/ubuntu/start.sh
