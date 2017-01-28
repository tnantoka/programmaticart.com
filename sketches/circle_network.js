'use strict'

class Circle {
  constructor(p, point) {
    this.p = p
    this.point = point
    this.radius = 25
  }

  display() {
    this.p.ellipse(this.point.x, this.point.y, this.radius, this.radius)
  }
}

class Network {
  constructor(p) {
    this.p = p
    this.circles = []
    this.max = p.random(100, 300)

    p.frameRate(20)
    p.background(0)
    p.ellipseMode(p.RADIUS)
  }

  display() {
    this.p.background(0)

    if (this.circles.length < this.max) {
      const x = this.p.random(0, this.p.width)
      const y = this.p.random(0, this.p.height)
      this.circles.push(new Circle(this.p, { x, y }))
    }

    this.p.noStroke()
    this.p.fill(255, 40)
    this.circles.forEach(circle => circle.display())

    for (let i = 0; i < this.circles.length - 1; i++) {
      const c1 = this.circles[i]
      const p1 = c1.point
      for (let j = i + 1; j < this.circles.length; j++) {
        const c2 = this.circles[j]
        const p2 = c2.point
        const distance = this.p.dist(p1.x, p1.y, p2.x, p2.y)
        if (distance < c1.radius + c2.radius) {
          this.p.stroke(255)
          this.p.line(p1.x, p1.y, p2.x, p2.y)
        }
      }
    }
  }
}

var sketch = function(p) {
  let network

  const mousePressed = () => {
    network = new Network(p)
  }

  p.setup = () => {
    const canvas = p.createCanvas(650, 250)
    network = new Network(p)
    canvas.mousePressed(mousePressed)
  }

  p.draw = () => {
    network.display()
  }
}

new p5(sketch, 'circle_network')
