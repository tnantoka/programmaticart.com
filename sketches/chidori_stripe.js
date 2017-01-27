'use strict'

class Stripe extends Chidoris {
  display() {
    this.p.noStroke()
    const colors = [128, 255]
    this.chidoris.forEach((line, i) => {
      this.p.fill(colors[i % 2])
      line.forEach(chidori => chidori.display())
    })
  }
}

var sketch = function(p) {
  let stripe

  const init = () => {
    stripe = new Stripe(p)
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
    stripe.display()
  }
}

new p5(sketch, 'chidori_stripe')
