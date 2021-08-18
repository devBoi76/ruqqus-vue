#!/bin/bash
cd ~/app/ruqqus-vue/
sudo npm install --unsafe-perm=true --allow-root
sudo npm audit fix
sudo npm fund
npm run build
cp -r dist/ ~/app/ruqqus-vue/ruqqus/assets
