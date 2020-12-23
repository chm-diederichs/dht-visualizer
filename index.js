function start () {
  const osm = new og.layer.XYZ('OpenStreetMap', {
    isBaseLayer: true,
    url: 'http://tile.stamen.com/toner-background/{z}/{x}/{y}.png',
    visibility: true
    // attribution: 'Data @ <a href="http://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="http://www.openstreetmap.org/copyright">ODbL</a>'
  })

  const SPEED_PARAMS = [
    [ 0.1, 16 ],
    [ 0.1, 8 ],
    [ 0.1, 5],
    [ 0.13, 4],
    [ 0.16, 3],
    [ 0.2, 2],
    [ 0.25, 1],
    [ 0.3, 2],
    [ 0.4, 1],
  ]

  const globus = new og.Globe({
    target: 'globus',
    name: 'Earth',
    layers: [osm],
    sun: {
      active: false
    }
  })

  let int
  rotate = rotateGlobe()

  globus.renderer.backgroundColor = new og.Vec3(0x37 / 255, 0x39 / 255, 0x40 / 255)
  globus.planet.setRatioLod(1.3, 1.1)
  globus.planet.camera.rotateDown(10, true)
  globus.planet.camera.rotateRight(90)
  globus.planet.camera.rotateUp(15)

  const markers = new og.layer.Vector('Markers', {
    async: true,
    clampToGround: true,
    scaleByDistance: [300000, 50000000, 1000000000000000000]
  })
    .addTo(globus.planet)

  setTimeout(() => {
    locations.map(add)
    globus.renderer.draw()
  }, 700)

  const canvas = document.getElementById('globus')
  canvas.onwheel = () => {
    if (rotate === null) return
    toggleRotate()
  }

  globus.planet.renderer.div.appendChild(document.getElementById('instructions'))

  class RotateControl extends og.Control {
    constructor(options) {
      super(options);
    }

    onadd() {
      var button = document.createElement("button");
      button.innerHTML = "rotate";
      var that = this;
      button.addEventListener("click", function (event) {
        event.preventDefault();
        toggleRotate()
      });

      this.renderer.div.appendChild(button);

      document.addEventListener('keydown', keyControl)

      // stop rotate when globe is dragged
      let moved
      let downListener = () => {
        moved = false
      }
      document.addEventListener('mousedown', downListener)
      let moveListener = () => {
        moved = true
      }
      document.addEventListener('mousemove', moveListener)
      let upListener = () => {
        if (moved) {
          stopRotate()
          moved = false
        }
      }
      document.addEventListener('mouseup', upListener)

      function keyControl (e) {
        const LEFT = ["a", "h", "ArrowLeft"]
        const DOWN = ["s", "j", "ArrowDown"]
        const UP = ["w", "k", "ArrowUp"]
        const RIGHT = ["d", "l", "ArrowRight"]
        const SPEED = "1234567890"

        const cam = globus.planet.camera

        let set = !!rotate
        if (set) {
          stopRotate()
        }

        if (LEFT.includes(e.key)) {
          cam.rotateRight(1)
        } else if (UP.includes(e.key)) {
          cam.rotateUp(1)
        } else if (DOWN.includes(e.key)) {
          cam.rotateDown(1)
        } else if (RIGHT.includes(e.key)) {
          cam.rotateLeft(1)
        } else if (SPEED.includes(e.key)) {
          if (e.key === '0') {
            rotate === null
            return
          }
          toggleRotate(Number(e.key))
        } else if (e.key === 'r') {
          if (!set) toggleRotate()
        } else {
          if (set) rotate = rotateGlobe()
          return
        }

        cam.update()
      }
    }
  }

  function stopRotate () {
    if (rotate !== null) {
      clearInterval(rotate)
      rotate = null
    }
  }

  function toggleRotate (speed) {
    if (rotate === null) {
      rotate = rotateGlobe(speed)
    } else {
      stopRotate()
    }
  }

  function rotateGlobe (speed = 2) {
    if (speed === 0) return stopRotate()

    let shift
    [ shift, int ] = SPEED_PARAMS[speed - 1]

    return setInterval(() => {
      globus.planet.camera.rotateRight(shift, true)
      globus.planet.camera.update()
    }, Math.floor(int))
  }

  function add (ll) {
    markers.add(new og.Entity({
      lonlat: [ll.longitude, ll.latitude],
      billboard: {
        outline: 4,
        outlineColor: 'rgba(0,0,0,.4)',
        src: './marker.webp',
        width: 16,
        height: 18,
        offset: [0, 2]
      }
    }))
  }

  globus.planet.addControl(new RotateControl)
  window.globus = globus
};
