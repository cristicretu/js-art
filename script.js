/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

ctx.height = window.innerHeight
ctx.width = window.innerWidth

let drawing = false
ctx.lineWidth = 0.5
ctx.fillStyle = '#FFF5DE'
ctx.strokeStyle = '3c5186'
// ctx.globalCompositeOperation = 'destination-over'
// ctx.globalCompositeOperation = 'source-over'
// ctx.globalCompositeOperation = 'destination-out'

class FlowFieldEffect {
  #ctx
  #width
  #height
  #count
  #radius
  constructor(ctx, width, height) {
    this.#ctx = ctx
    this.#ctx.lineWidth = 0.5
    this.#width = width
    this.#height = height
    this.#radius = 1.9
    this.vr = 0.03
    this.#mapField()
    this.timer = 0
    this.cellSize = 7
    this.interval = 1000 / 60
    this.timer = 0
    this.lastTime = 0
  }
  #mapField(timeStamp) {
    let deltaTime = timeStamp - this.lastTime
    this.lastTime = timeStamp
    if (this.timer > this.interval) {
      this.#ctx.clearRect(0, 0, this.#width, this.#height)
      this.#radius += this.vr
      if (this.#radius > 5 || this.#radius < -5) this.vr *= -1
      for (let y = 0; y < this.#height; y += this.cellSize) {
        for (let x = 0; x < this.#width; x += this.cellSize) {
          const angle = this.#getValue(x, y)
          this.#ctx.save()
          this.#ctx.translate(x, y)
          this.#draw(angle)
          this.#ctx.restore()
        }
      }
      this.timer = 0
    } else {
      this.timer += deltaTime
    }

    requestAnimationFrame(this.#mapField.bind(this))
  }
  #getValue(x, y) {
    return (Math.cos(x * 0.005) + Math.sin(y * 0.005)) * Math.PI * this.#radius
  }
  #draw(angle) {
    //const length1 = Math.random() * 10 + 10;
    //const length2 = Math.random() * 10 + 10;
    this.#ctx.rotate(angle)
    this.#ctx.beginPath()
    this.#ctx.moveTo(0, 0)
    this.#ctx.lineTo(25, 0)
    this.#ctx.stroke()
  }
}

class Root {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.speedX = Math.random() * 3.7 - 2.1
    this.speedY = Math.random() * 3.8 - 1.3
    this.maxSize = Math.random() * 7 + 4
    this.size = Math.random() * 2 + 1.2
    this.angleX = Math.random() * Math.PI * 2 + 0.05
    this.angleY = Math.random() * Math.PI * 1.4 + 0.15
    this.velocitySize = Math.random() * 0.35 + 0.05
    this.velocityAngleX = Math.random() * 0.6 - 0.3
    this.velocityAngleY = Math.random() * 0.3 - 0.5
    this.lightness = 10
  }
  update() {
    this.x += this.speedX + Math.sin(this.angleX)
    this.y += this.speedY + Math.sin(this.angleY)
    this.size += this.velocitySize
    this.angleX += this.velocityAngleX
    this.angleY += this.velocityAngleY
    if (this.lightness < 70) this.lightness += 0.25
    if (this.size < this.maxSize) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
      ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2, true)
      ctx.arc(this.x, this.y, this.size * 0.25, 0, Math.PI * 2, true)
      ctx.arc(this.x, this.y, this.size * 0.1, 0, Math.PI * 2, true)
      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.size
      )
      for (let i = 0; i < 100; i++) {
        gradient.addColorStop(i / 100, `hsl(${i * 2}, 100%, 50%)`)
      }
      ctx.fillStyle = gradient
      ctx.fill()
      ctx.stroke()
      requestAnimationFrame(() => this.update())
      ///////////
      // ctx.save()
      // ctx.translate(this.x, this.y)
      // ctx.rotate(this.angleX)
      // ctx.rotate(this.angleY)
      // ctx.fillStyle = `hsl(${this.lightness}, 100%, 50%)`
      // ctx.fillRect(-this.size * 0.5, -this.size * 0.5, this.size, this.size)
      // ctx.strokeStyle = '#3c5186'
      // ctx.strokeRect(-this.size * 0.5, -this.size * 0.5, this.size, this.size)
      // requestAnimationFrame(() => this.update())
      // ctx.restore()
    }
  }
}

// make a trajectory starting from the top left to the bottom right

window.addEventListener('mousemove', function (e) {
  if (drawing) {
    const root = new Root(e.clientX, e.clientY)
    root.update()
  }
})

window.addEventListener('mousedown', function () {
  drawing = true
})
window.addEventListener('mouseup', function () {
  drawing = false
})

// window.onload = function () {
//   const canvas = document.getElementById('canvas1')
//   const ctx = canvas.getContext('2d')

//   canvas.width = window.innerWidth
//   canvas.height = window.innerHeight
//   const flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height)
//   console.log('loaded')
// }
