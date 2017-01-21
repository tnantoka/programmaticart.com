'use strict'

class Lines {
  constructor(p) {
    this.p = p
    this.lines = []
    const n = p.random(30, 50)
    const center = { y: p.height / 2 }
    for (let i = 0; i < n; i++) {
      const point1 = {
        x: p.random(0, p.width),
        y: center.y + p.random(-30, 30),
      }
      const point2 = {
        x: point1.x,
        y: point1.y + p.random(30, 50),
      }
      this.lines.push(new Line(p, point1, point2))
    }
  }

  display() {
    this.p.clear()
    this.p.stroke(0)
    this.lines.forEach(line => line.display())
  }
}

class Line {
  constructor(p, point1, point2) {
    this.p = p
    this.point1 = point1
    this.point2 = point2
  }

  display() {
    this.p.line(this.point1.x, this.point1.y, this.point2.x, this.point2.y)
    this.point1.x += this.p.random(-2, 2)
    this.point1.y += this.p.random(-2, 2)
    this.point2.x += this.p.random(-2, 2)
    this.point2.y += this.p.random(-2, 2)
  }
}

var sketch = function(p) {
  let lines

  const mousePressed = () => {
    lines = new Lines(p)
  }

  p.setup = () => {
    const canvas = p.createCanvas(650, 250)
    lines = new Lines(p)
    canvas.mousePressed(mousePressed)
  }

  p.draw = () => {
    lines.display()
  }
}

new p5(sketch, 'shake_line')
