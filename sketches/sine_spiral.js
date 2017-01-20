'use strict'

class Spiral {
  constructor(p) {
    this.p = p
    this.angleStep = p.random(4, 20)
    this.radiusStep = p.random(0.3, 0.6)
  }

  display() {
    this.p.clear()
    this.p.fill(0)
    this.p.noStroke()

    const center = { x: this.p.width / 2, y: this.p.height / 2 }

    let radius = 1
    for (let i = 0; i < 360 * 6; i += this.angleStep) {
      const angle = this.p.radians(i)
      const x = center.x + this.p.cos(angle) * radius
      const y = center.y + this.p.sin(angle) * radius
      this.p.ellipse(x, y, 4, 4)

      radius += this.radiusStep
    }
  }
}

var sketch = function(p) {
  let spiral

  const mousePressed = () => {
    spiral = new Spiral(p)
  }

  p.setup = () => {
    const canvas = p.createCanvas(650, 250)
    spiral = new Spiral(p)
    canvas.mousePressed(mousePressed)
  }

  p.draw = () => {
    spiral.display()
  }
}

new p5(sketch, 'sine_spiral')
