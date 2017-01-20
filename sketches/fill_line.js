'use strict'

class Line {
  constructor(p) {
    this.p = p
    this.seed = p.random(6, 12)
    this.range = p.random(10, 20)
  }

  display() {
    this.p.randomSeed(this.seed)
    this.p.clear()
    this.p.background(0)
    this.p.stroke(255, 102)

    let radius = 1
    for (let i = 0; i < this.p.width; i += 6) {
      const r = this.p.random(-this.range, this.range)
      this.p.strokeWeight(this.p.abs(r))
      this.p.line(i - r, this.p.height, i + r, 0)
    }
  }
}

var sketch = function(p) {
  let line

  const mousePressed = () => {
    line = new Line(p)
  }

  p.setup = () => {
    const canvas = p.createCanvas(650, 250)
    line = new Line(p)
    canvas.mousePressed(mousePressed)
  }

  p.draw = () => {
    line.display()
  }
}

new p5(sketch, 'fill_line')
