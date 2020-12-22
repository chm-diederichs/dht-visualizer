#!/usr/bin/env node

const fs = require('fs')
const query = require('dht-size-up')
const geoip = require('geoip-lite')
const dht = require('dht-rpc')

const node = dht({
  ephemeral: true,
  bootstrap: ['bootstrap1.hyperdht.org:49737', 'bootstrap2.hyperdht.org:49737', 'bootstrap3.hyperdht.org:49737']
})

query(node, process.argv[2] || 20, (err, size, seen, samples, ips) => {
  if (err) {
    console.error(err)
    process.exit()
  }

  var locations = []

  for (let [ip, n] of ips) {
    if (ip === '127.0.0.1') continue

    var { ll } = geoip.lookup(ip)
    var [ latitude, longitude ] = ll

    locations.push({ latitude, longitude })
  }

  fs.writeFile('locations.json', 'locations =' + JSON.stringify(locations, null, 2), (err) => {
    if (err) console.error(err)

    process.exit()
  })
})
