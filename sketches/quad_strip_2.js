'use strict'

class Wave2 {
  constructor(p) {
    this.p = p

    this.curve = {
      width: p.random(20, 40),
      thickness: p.random(40, 60),
    }
    this.angle = {
      increment: p.random(0, 0.2),
      offset: 0.9,
    }
    this.offsetY = 10

    p.noStroke()
  }

  display() {
    this.p.clear()

    let angleA = 0
    let angleB = angleA + this.angle.offset

    for (let x = 0; x < this.p.width; x += this.curve.width * 3) {
      const gray = this.p.map(x, 0, this.p.width, 0, 255)
      this.p.fill(gray)
      this.p.beginShape(this.p.QUAD_STRIP)
      for (let y = 0; y <= this.p.height; y += this.offsetY) {
        const x1 = x + this.p.sin(angleA) * this.curve.width
        const x2 = x + this.p.sin(angleB) * this.curve.width
        this.p.vertex(x1, y)
        this.p.vertex(x2 + this.curve.thickness, y)
        angleA += this.angle.increment
        angleB = angleA + this.angle.offset
      }
      this.p.endShape()
    }
  }
}

var sketch = function(p) {
  let wave

  const mousePressed = () => {
    wave = new Wave2(p)
  }

  p.setup = () => {
    const canvas = p.createCanvas(650, 250)
    wave = new Wave2(p)
    canvas.mousePressed(mousePressed)
  }

  p.draw = () => {
    wave.display()
  }
}

new p5(sketch, 'quad_strip')
