const canvasSketch = require('canvas-sketch')
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [1080, 1080],
  animate: true,
}

const sketch = ({ context, width, height }) => {
  const cx = width * 0.5
  const cy = height * 0.5
  const w = width * 0.01
  const h = height * 0.1

  let x, y

  const num = 24
  const radius = width * 0.3

  const rings = new Array(num).fill(0).map((_, i) => {
    const slice = math.degToRad(360 / num)

    return new Ring(
      radius * random.range(0.7, 1.3),
      slice * random.range(0, -8),
      slice * random.range(0, 5),
      random.range(5, 20),
      new Vector(cx, cy),
      slice * i
    )
  })

  const ticks = new Array(num).fill(0).map((_, i) => {
    const slice = math.degToRad(360 / num)
    const angle = slice * i

    return new Tick(
      new Vector(cx, cy),
      angle,
      new Vector(random.range(0.1, 2), random.range(0.2, 3)),
      w,
      h,
      new Vector(cx + radius * Math.sin(angle), cy + radius * Math.cos(angle)),
      random.range(0, -h * 0.5)
    )
  })

  return ({ context, width, height }) => {
    context.fillStyle = 'black'
    context.fillRect(0, 0, width, height)

    context.fillStyle = 'white'

    for (let i = 0; i < num; i++) {
      ticks[i].draw(context)

      rings[i].update()
      rings[i].draw(context)
    }
  }
}

class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class Tick {
  constructor(center, angle, scale, width, height, position, yOffset) {
    this.center = center
    this.angle = angle
    this.scale = scale
    this.width = width
    this.height = height
    this.position = position
    this.yOffset = yOffset
  }

  draw(context) {
    context.save()
    context.translate(this.position.x, this.position.y)
    context.rotate(-this.angle)
    context.scale(this.scale.x, this.scale.y)

    context.beginPath()
    context.rect(-this.width * 0.5 + (Math.random() > 0.995 ? random.range(-20, 20) : 0), this.yOffset + (Math.random() > 0.995 ? random.range(-20, 20) : 0), this.width, this.height)
    context.fill()
    context.restore()
  }
}

class Ring {
  constructor(radius, arcStart, arcEnd, lineWidth, center, angle) {
    this.radius = radius
    this.arcLength = new Vector(arcStart, arcEnd)
    this.lineWidth = lineWidth
    this.center = center
    this.angle = angle
    this.angularVelocity = new Vector(random.range(-0.02, 0.020), 1)
  }

  update() {
    this.angle +=
      this.angularVelocity.y == 1
        ? this.angularVelocity.x
        : -this.angularVelocity.x
  }

  draw(context) {
    context.save()
    context.translate(this.center.x, this.center.y)
    context.rotate(this.angle)

    context.lineWidth = this.lineWidth

    context.beginPath()
    context.arc(0, 0, this.radius, this.arcLength.x, this.arcLength.y)
    context.strokeStyle = 'white'
    context.stroke()

    context.restore()
  }
}

canvasSketch(sketch, settings)
