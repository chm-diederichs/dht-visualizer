# dht-visualizer

## Install
```
git clone git@github.com:chm-diederichs/dht-visualizer.git
npm install

node globe.js
node app.js <PORT>
```
## Update geolite2 db

The ip address database is updated more often than the npm package, so for accurate location date, be sure to update the GeoLite2 db:

```
cd node_modules/geoip-lite
npm run-script updatedb license_key=LICENSE_KEY
```
You can register for a free license key [here](https://www.maxmind.com/en/geolite2/signup)

