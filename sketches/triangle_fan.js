'use strict'

class Fan {
  constructor(p) {
    this.p = p
    this.step = p.random([5, 10, 15, 20, 30])
    this.gap = p.random(5, 30)
  }

  display() {
    this.p.clear()
    this.p.stroke(0)
    this.p.noFill()

    this.p.beginShape(this.p.TRIANGLE_FAN)

    const center = { x: this.p.width / 2, y: this.p.height / 2 }

    this.p.vertex(center.x, center.y)

    for (let i = 0; i <= 360 / this.step; i++) {
      const degree = i * this.step
      const radian = this.p.radians(degree)
      
      const gap = this.gap * (-1 * (i % 2))
      const radius = this.p.height * 0.4 + gap

      const x = center.x + radius * this.p.cos(radian) 
      const y = center.y + radius * this.p.sin(radian) 
      this.p.vertex(x, y)
    }

    this.p.vertex(center.x, center.y)

    this.p.endShape()
  }
}

var sketch = function(p) {
  let fan

  const mousePressed = () => {
    fan = new Fan(p)
  }

  p.setup = () => {
    const canvas = p.createCanvas(650, 250)
    fan = new Fan(p)
    canvas.mousePressed(mousePressed)
  }

  p.draw = () => {
    fan.display()
  }
}

new p5(sketch, 'triangle_fan')
