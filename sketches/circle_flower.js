'use strict'

class Flower {
  constructor(p) {
    this.p = p
    this.radius = p.random(5, 20)
  }

  display() {
    this.p.clear()
    this.p.background(0)
    this.p.fill(255, 204)
    this.p.noStroke()

    const center = { x: this.p.width / 2, y: this.p.height / 2 }

    this.p.ellipse(center.x, -this.radius, this.p.height, this.p.height)
    this.p.ellipse(center.x, this.p.height + this.radius, this.p.height, this.p.height)
    this.p.ellipse(center.x - center.y - this.radius, center.y, this.p.height, this.p.height)
    this.p.ellipse(center.x + center.y + this.radius, center.y, this.p.height, this.p.height)

    this.p.fill(0)
    this.p.rect(0, 0, center.x - center.y, this.p.height)
    this.p.rect(center.x + center.y, 0, this.p.width, this.p.height)
  }
}

var sketch = function(p) {
  let flower

  const mousePressed = () => {
    flower = new Flower(p)
  }

  p.setup = () => {
    const canvas = p.createCanvas(650, 250)
    flower = new Flower(p)
    canvas.mousePressed(mousePressed)
  }

  p.draw = () => {
    flower.display()
  }
}

new p5(sketch, 'circle_flower')
