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
    this.p.beginShape()
    this.p.vertex(points[0].x, points[0].y)
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

      this.p.bezierVertex(
        control1.x, control1.y,
        control2.x, control2.y,
        point2.x, point2.y
      )
    }
    this.p.endShape()
  }
}

class Chidoris {
  constructor(p) {
    this.p = p
    this.chidoris = []

    const radius = 40
    const length = radius * Math.sqrt(3)

    const countY = p.height / radius * 1.5
    const countX = p.width / length
    const baseY = -length / 2
    let yScale = 0 
    for (let i = 0; i < countY; i++) {
      yScale += i % 2 == 0 ? 1 : 0.5
      const xScale = yScale / 0.5 % 2 == 0 ? 0 : 0.5  
      const startAngle = i % 2 == 0 ? 90 : 30

      const line = []
      for (let j = 0; j < countX; j++) {
        const x = j * length + length * xScale
        const y = baseY + radius * yScale
        line.push(new Chidori(p, { x, y }, radius, startAngle))
      }
      this.chidoris.push(line)
    }
  }

  display() {
    this.chidoris.forEach(line =>
      line.forEach(chidori => chidori.display())
    )
  }
}
