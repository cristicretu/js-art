/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

ctx.height = window.innerHeight
ctx.width = window.innerWidth

class Root {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.speedX = Math.random() * 3.7 - 2.1
    this.speedY = Math.random() * 3.8 - 1.3
    this.maxSize = Math.random() * 7 + 5
    this.size = Math.random() * 1 + 2
    this.angleX = Math.random() * Math.PI * 2 + 0.05
    this.angleY = Math.random() * Math.PI * 1.4 + 0.15
    this.velocitySize = Math.random() * 0.35 + 0.05
    this.velocityAngleX = Math.random() * 0.6 - 0.3
    this.velocityAngleY = Math.random() * 0.3 - 0.5
  }
  update() {
    this.x += this.speedX + Math.sin(this.angleX)
    this.y += this.speedY + Math.sin(this.angleY)
    this.size += this.velocitySize
    this.angleX += this.velocityAngleX
    this.angleY += this.velocityAngleY
    if (this.size < this.maxSize) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
      // ctx.fillStyle = 'hsl(' + Math.random() * 360 + ', 100%, 50%)'
      ctx.fillStyle = 'hsl(120, 100%, 50%)'
      ctx.fill()
      ctx.stroke()
      requestAnimationFrame(() => this.update())
      // requestAnimationFrame(this.update.bind(this))
    }
  }
}

window.addEventListener('mousemove', function (e) {
  const root = new Root(e.x, e.y)
  root.update()
})
