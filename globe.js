const fs = require('fs')
const query = require('dht-size-up')
const geoip = require('geoip-lite')
const dht = require('dht-rpc')

const nodes = ['localhost:' + process.argv[2]]
var bootstrap = dht({ ephemeral: true, bootstrap: nodes })

query(bootstrap, 3, (err, size, seen, samples, ips) => {
  var locations = []

  for (let [ip, n] of ips) {
    if (ip === '127.0.0.1') continue

    var { ll } = geoip.lookup(ip)

    var [ latitude, longitude ] = ll
    locations.push({ latitude, longitude })
  }

  fs.writeFile('locations.json', JSON.stringify(locations, null, 2), console.error)
})
