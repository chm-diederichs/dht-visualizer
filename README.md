# dht-visualizer

Find locations of peers in the DHT. Made for http://globe.hyperdht.org/.

## Install
```
git clone git@github.com:chm-diederichs/dht-visualizer.git
npm install

node globe.js
node app.js <PORT>
```

## Rebuilding OpenGlobus

A build of OpenGlobus is in this repo, but in case you would like to rebuild, follow the following commands taken from: https://www.github.com/openglobus/openglobus

```
git clone git@github.com:openglobus/openglobus

cd openglobus

npm install
npm run build

cp -r lib ./APP_DIR
```

## Update geolite2 db

The ip address database is updated more often than the npm package, so for accurate location date, be sure to update the GeoLite2 db:

```
cd node_modules/geoip-lite
npm run-script updatedb license_key=LICENSE_KEY
```
You can register for a free license key [here](https://www.maxmind.com/en/geolite2/signup)

## Future work

Would be great to get a globe like [this](https://stripe.com/blog/globe)...
