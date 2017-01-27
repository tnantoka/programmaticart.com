'use strict'

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

new p5(sketch, 'chidori_pattern')
