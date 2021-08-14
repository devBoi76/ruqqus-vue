#!/bin/bash
cd ~/
sudo cp ruqqus-vue/nginx.txt /etc/nginx/sites-available/ruqqus.com.conf
sudo nginx -s reload
source venv/bin/activate
source env.sh
cd ~/ruqqus-vue/ruqqus/frontend
sudo npm install --unsafe-perm=true --allow-root
sudo npm audit fix
sudo npm fund
npm run build
cp -r dist/ ~/ruqqus-vue/ruqqus/assets
cd ~/ruqqus-vue
pip3 install -r requirements.txt
export PYTHONPATH=$PYTHONPATH:~/mirrored
export S3_BUCKET_NAME=i.ruqqus.com
export CACHE_TYPE="redis"
export HCAPTCHA_SITEKEY="22beca86-6e93-421c-8510-f07c6914dadb"
cd ~/

echo "starting background worker"
python mirrored/scripts/recomputes.py

# echo "starting regular workers"
# NEW_RELIC_CONFIG_FILE=newrelic.ini newrelic-admin run-program gunicorn ruqqus.__main__:app -k gevent -w $WEB_CONCURRENCY --worker-connections $WORKER_CONNECTIONS --preload --max-requests 10000 --max-requests-jitter 500 --bind 127.0.0.1:5000


echo "starting regular workers"
NEW_RELIC_CONFIG_FILE=newrelic.ini newrelic-admin run-program gunicorn ruqqus.__main__:app -k gevent -w $WEB_CONCURRENCY --worker-connections $WORKER_CONNECTIONS --preload --max-requests 10000 --max-requests-jitter 500 --bind 127.0.0.1:5000
