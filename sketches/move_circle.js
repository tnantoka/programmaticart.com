'use strict'

class Circle {
  constructor(p) {
    this.p = p
    this.angle = 0
    this.speed = 0.02
    this.radius = 60
    this.scale = {
      x: p.random(2, 3),
      y: p.random(2, 3),
    }
    p.clear()
    p.background(0)
  }

  display() {
    this.p.fill(0, 4)
    this.p.rect(0, 0, this.p.width, this.p.height)
    this.p.fill(255)
    this.p.noStroke()

    const center = { x: this.p.width / 2, y: this.p.height / 2 }

    const sin = this.p.sin(this.angle)
    const cos = this.p.cos(this.angle)
    const point = {
      x: center.x + cos * this.radius,
      y: center.y + sin * this.radius,
    }
    this.p.ellipse(point.x, point.y, 2, 2)

    const point2 = {
      x: point.x + this.p.cos(this.angle * this.scale.x) * this.radius / 2,
      y: point.y + this.p.sin(this.angle * this.scale.y) * this.radius / 2,
    }
    this.p.ellipse(point2.x, point2.y, 6, 6)

    this.angle += this.speed
  }
}

var sketch = function(p) {
  let circle

  const mousePressed = () => {
    circle = new Circle(p)
  }

  p.setup = () => {
    const canvas = p.createCanvas(650, 250)
    circle = new Circle(p)
    canvas.mousePressed(mousePressed)
  }

  p.draw = () => {
    circle.display()
  }
}

new p5(sketch, 'move_circle')
