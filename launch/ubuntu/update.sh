#!/bin/bash
echo Update BuildJS

bash /etc/nodejs/BuildJS/launch/ubuntu/stop.sh

cd /etc/nodejs/BuildJS
git reset --hard
git pull origin master
npm install --production
bower install --production --allow-root
lessc ../public/Resources/less/base.less ../public/Resources/css/base.css

bash /etc/nodejs/BuildJS/launch/ubuntu/start.sh
