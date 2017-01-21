'use strict'

class Tree {
  constructor(p) {
    this.p = p
    this.length = p.random(30, 120)
    this.n = p.random(3, 6)
  }

  display() {
    this.p.clear()
    this.p.fill(0)
    this.p.stroke(0)

    const center = { x: this.p.width / 2 }

    this.drawTree(center.x, this.p.height, this.length, this.n)
  }

  drawTree(x, y, length, n) {
    this.p.line(x, y, x, y - length)
    this.p.line(x - length, y - length, x + length, y - length)
    if (n > 0) {
      this.drawTree(x - length, y - length, length / 2, n - 1)
      this.drawTree(x + length, y - length, length / 2, n - 1)
    }
  }
}

var sketch = function(p) {
  let tree

  const mousePressed = () => {
    tree = new Tree(p)
  }

  p.setup = () => {
    const canvas = p.createCanvas(650, 250)
    tree = new Tree(p)
    canvas.mousePressed(mousePressed)
  }

  p.draw = () => {
    tree.display()
  }
}

new p5(sketch, 'binary_tree')
