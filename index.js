function start () {
  const osm = new og.layer.XYZ('OpenStreetMap', {
    isBaseLayer: true,
    url: 'http://tile.stamen.com/toner-background/{z}/{x}/{y}.png',
    visibility: true
    // attribution: 'Data @ <a href="http://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="http://www.openstreetmap.org/copyright">ODbL</a>'
  })

  const globus = new og.Globe({
    target: 'globus',
    name: 'Earth',
    layers: [osm],
    sun: {
      active: false
    }
  })

  globus.renderer.backgroundColor = new og.Vec3(150 / 255, 150 / 255, 150 / 255)

  globus.planet.setRatioLod(1.3, 1.1)
  console.log('locations', locations)

  const markers = new og.layer.Vector('Markers', {
    clampToGround: true,
    scaleByDistance: [300000, 50000000, 1000000000000000000]
  })
    .addTo(globus.planet)

  const entities = []
  locations.map(ll => {
    const entity = new og.Entity({
      lonlat: [ll.longitude, ll.latitude],
      label: {
        text: '',
        outline: 0,
        outlineColor: 'rgba(255,255,255,.4)',
        size: 27,
        color: 'black',
        face: 'Lucida Console',
        offset: [10, -2]
      },
      billboard: {
        outline: 4,
        outlineColor: 'rgba(0,0,0,.4)',
        src: './marker5.png',
        width: 32,
        height: 32,
        offset: [0, 2]
      }
    })

    markers.add(entity)
  })

  //   globus.planet.viewExtent(
  // new og.Extent(new og.LonLat(5.56707, 45.15679),
  // new og.LonLat(5.88834, 45.22260)));

  window.globus = globus
};
