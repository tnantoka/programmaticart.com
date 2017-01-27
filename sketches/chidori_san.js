'use strict'

class San {
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
  let san

  const init = () => {
    san = new San(p)
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
    san.display()
  }
}

new p5(sketch, 'chidori_san')
