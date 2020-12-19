# dht-visualizer

## Install
```
git clone git@github.com:chm-diederichs/dht-visualizer.git
npm install

node globe.js <BOOTSTRAP_NODE_PORT>

# update geolite2 db
cd node_modules/geoip-lite
npm run-script updatedb license_key=LICENSE_KEY
```

Now use [http-server](https://www.npmjs.com/package/http-server) or a similar module to run an http-server from this directory and navigate to the site in your browser.
