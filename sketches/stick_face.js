'use strict'

class Face {
  constructor(p) {
    this.p = p
    this.nose = {
      width: p.random(20, 100),
      height: p.random(50, 200),
    }
  }

  display() {
    this.p.clear()
    this.p.fill(0)
    this.p.stroke(0)

    const center = { x: this.p.width / 2 - this.nose.width / 2 }

    this.p.line(center.x, 0, center.x, this.nose.height)
    this.p.line(center.x, this.nose.height, center.x + this.nose.width, this.nose.height)
    this.p.line(center.x + this.nose.width, this.nose.height, center.x + this.nose.width, this.p.height)

    this.p.ellipse(center.x - this.nose.width / 2, this.nose.height / 2, 5, 5)
    this.p.ellipse(center.x + this.nose.width, this.nose.height / 2, 5, 5)

    const mouthY = this.nose.height + (this.p.height - this.nose.height) / 2
    this.p.line(center.x, mouthY, center.x + this.nose.width, mouthY)
  }
}

var sketch = function(p) {
  let face

  const mousePressed = () => {
    face = new Face(p)
  }

  p.setup = () => {
    const canvas = p.createCanvas(650, 250)
    face = new Face(p)
    canvas.mousePressed(mousePressed)
  }

  p.draw = () => {
    face.display()
  }
}

new p5(sketch, 'stick_face')
