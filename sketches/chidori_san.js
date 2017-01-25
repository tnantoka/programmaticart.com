'use strict'

class Chidori {
  constructor(p, point, radius, startAngle) {
    this.p = p
    this.point = point
    this.radius = radius 
    this.startAngle = startAngle

    p.stroke(0)
  }

  display() {
    const points = []
    for (let i = this.startAngle; i < 360 + this.startAngle; i += 120) {
      const angle = this.p.radians(i) 
      const x = this.point.x + this.p.cos(angle) * this.radius
      const y = this.point.y + this.p.sin(angle) * this.radius
      points.push({ x, y })
    }
    for (let i = 0; i < points.length; i++) {
      const point1 = points[i]
      const point2 = points[(i + 1) % points.length]

      const dist = this.p.dist(point1.x, point1.y, point2.x, point2.y)
      const center = { x: (point1.x + point2.x) / 2, y: (point1.y + point2.y) / 2 }

      this.p.push()
      this.p.translate(center.x, center.y)
      const angle = this.p.atan2(point1.y - center.y, point1.x - center.x)
      this.p.pop()

      const radius = dist * 0.34
      const control1 = {
        x: center.x + this.p.cos(angle + this.p.radians(90)) * radius, 
        y: center.y + this.p.sin(angle + this.p.radians(90)) * radius, 
      }
      const control2 = {
        x: center.x + this.p.cos(angle + this.p.radians(270)) * radius, 
        y: center.y + this.p.sin(angle + this.p.radians(270)) * radius, 
      }

      this.p.bezier(
        point1.x, point1.y,
        control1.x, control1.y,
        control2.x, control2.y,
        point2.x, point2.y
      )
    }
  }
}

class Chidoris {
  constructor(p) {
    this.p = p
    this.chidoris = []

    const center = { x: p.width / 2, y: p.height / 2 }
    const radius = 50
    for (let i = 0; i < 6; i++) {
      const angle = p.radians(i * 60)
      const x = center.x + p.cos(angle) * radius 
      const y = center.y + p.sin(angle) * radius 
      const startAngle = i % 2 == 0 ? 60 : 0
      this.chidoris.push(new Chidori(p, { x, y }, radius, startAngle))
    }

    for (let i = 0; i < 6; i++) {
      const angle = p.radians(i * 60)
      const x = center.x + p.cos(angle) * radius * 2
      const y = center.y + p.sin(angle) * radius * 2
      const startAngle = i % 2 == 1 ? 60 : 0
      this.chidoris.push(new Chidori(p, { x, y }, radius, startAngle))
    }
  }

  display() {
    this.chidoris.forEach(chidori => chidori.display())
    const center = { x: this.p.width / 2, y: this.p.height / 2 }
    const radius = 50
    this.p.noFill()
    this.p.ellipse(center.x, center.y, radius * 2, radius * 2)
    this.p.ellipse(center.x, center.y, radius * 4, radius * 4)
  }
}

var sketch = function(p) {
  let chidoris

  const init = () => {
    chidoris = new Chidoris(p)
  }
  const mousePressed = () => {
    init()
  }

  p.setup = () => {
    const canvas = p.createCanvas(650, 250)
    canvas.mousePressed(mousePressed)
    init()
  }

  p.draw = () => {
    p.clear()
    chidoris.display()
  }
}

new p5(sketch, 'chidori_san')
