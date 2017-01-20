'use strict'

class Spiral2 {
  constructor(p) {
    this.p = p
    this.angleStep = p.random(10, 20)
    this.radiusStep = p.random(1.05, 1.1)
    this.line = p.random([true, false])
  }

  display() {
    this.p.clear()
    this.p.fill(0)
    this.p.stroke(0)

    const center = { x: this.p.width / 2 * 0.5, y: this.p.height / 2 * 1.5 }

    let radius = 1
    let last = center
    for (let i = 0; i < 360 * 5; i += this.angleStep) {
      const angle = this.p.radians(i)
      const x = center.x + this.p.cos(angle) * radius
      const y = center.y + this.p.sin(angle) * radius
      this.p.ellipse(x, y, 4, 4)
      if (this.line) {
        this.p.line(last.x, last.y, x, y)
        // if (x > 0 && x < this.p.width && y > 0 && y < this.p.height) {
        //   this.p.line(center.x, center.y, x, y)
        // }
      }
      last = { x, y }

      radius *= this.radiusStep
    }
  }
}

var sketch = function(p) {
  let spiral

  const mousePressed = () => {
    spiral = new Spiral2(p)
  }

  p.setup = () => {
    const canvas = p.createCanvas(650, 250)
    spiral = new Spiral2(p)
    canvas.mousePressed(mousePressed)
  }

  p.draw = () => {
    spiral.display()
  }
}

new p5(sketch, 'sine_spiral_2')
