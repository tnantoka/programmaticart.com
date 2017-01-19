'use strict'

class Fang {
  constructor(p) {
    this.p = p
    this.offset = p.height / 2
    this.scale = p.random(20, 80)
    this.step = p.PI / p.random(20, 50)
  }

  display() {
    this.p.clear()
    this.p.stroke(0)
    this.p.noFill()

    let angle = 0

    this.p.beginShape(this.p.TRIANGLE_STRIP)

    for (let x = 1; x <= this.p.width; x += 5) {
      const y = this.p.sin(angle) * this.scale
      const sign = x % 2 == 0 ? 1 : -1
      this.p.vertex(x, this.offset + y * sign)

      angle += this.step
    }

    this.p.endShape()
  }
}

var sketch = function(p) {
  let fang

  const mousePressed = () => {
    fang = new Fang(p)
  }

  p.setup = () => {
    const canvas = p.createCanvas(650, 250)
    fang = new Fang(p)
    canvas.mousePressed(mousePressed)
  }

  p.draw = () => {
    fang.display()
  }
}

new p5(sketch, 'sine_fang')
