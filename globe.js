#!/usr/bin/env node

const fs = require('fs')
const query = require('dht-size-up')
const geoip = require('geoip-lite')
const DHT = require('dht-rpc')

const node = new DHT({
  bootstrap: ['45.88.188.201:40006']
})

node.ready().then(() => {
  query(node, process.argv[2] || 20, (err, size, seen, samples, ips) => {
    if (err) {
      console.error(err)
      process.exit()
    }

    var locations = []

    for (let ip of ips) {
      if (!ip || ip === '127.0.0.1') continue

      var { ll } = geoip.lookup(ip)
      var [ latitude, longitude ] = ll

      locations.push({ latitude, longitude })
    }

    fs.writeFile('locations.json', 'locations =' + JSON.stringify(locations, null, 2), (err) => {
      if (err) console.error(err)

      process.exit()
    })
  })
})
