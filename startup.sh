#!/bin/bash
cd ~/app/ruqqus-vue/
#echo "Pulling in Frontend changes"
#git pull
echo "Install Frontend Reqs"
sudo npm install --unsafe-perm=true --allow-root
sudo npm audit fix
sudo npm fund
echo "Building Vue"
rm -rf src/assets/dist
npm run build
cp -r dist/ src/assets
