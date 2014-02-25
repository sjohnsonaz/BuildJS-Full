description     "BuildJS"
author          "Sean Johnson"

start on startup mountall
stop on shutdown

respawn
respawn limit 99 5

script
        export HOME="/root"
#"/home/sjohnson"

        echo $$ > /var/run/BuildJS.pid
        exec sudo -u root node /etc/nodejs/BuildJS/app.js >> /var/log/BuildJS.log
end script

pre-start script
    # Date format same as (new Date()).toISOString() for consistency
    echo "[`date -u +%Y-%m-%dT%T.%3NZ`] (sys) Starting" >> /var/log/BuildJS.log
end script

pre-stop script
    rm /var/run/BuildJS.pid
    echo "[`date -u +%Y-%m-%dT%T.%3NZ`] (sys) Stopping" >> /var/log/BuildJS.log
end script
