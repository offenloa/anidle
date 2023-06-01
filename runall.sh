#!/bin/sh
cd /root/personal_website
forever stopall
forever start app.js
cd /root/personal_website/website_client
npm run build
forever start -c "./run.sh" ./
