/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

ctx.height = window.innerHeight
ctx.width = window.innerWidth

class Root {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.speedX = Math.random() * 4 - 2
    this.speedY = Math.random() * 4 - 2
    this.maxSize = Math.random() * 7 + 5
    this.size = Math.random() * 1 + 2
  }
  update() {
    this.x += this.speedX
    this.y += this.speedY
    this.size += 0.1
    if (this.size < this.maxSize) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
      // ctx.fillStyle = 'hsl(' + Math.random() * 360 + ', 100%, 50%)'
      ctx.fillStyle = 'hsl(120, 100%, 50%)'
      ctx.fill()
      ctx.stroke()
    }
  }
}

window.addEventListener('mousemove', function (e) {
  const root = new Root(e.x, e.y)
  root.update()
})
