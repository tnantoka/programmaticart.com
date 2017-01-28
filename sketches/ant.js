'use strict'

class Ant {
  constructor(p, point) {
    this.p = p

    this.direction = {
      south: 0,
      east: 1,
      north: 2,
      west: 3,
    }
    this.on = p.color(255)
    this.off = p.color(0)

    this.dir = this.direction.north
    this.x = p.width / 2
    this.y = p.height / 2

    p.background(0)
  }

  display() {
    if (this.dir == this.direction.south) {
      this.y = (this.y + 1) % this.p.height
    } else if (this.dir == this.direction.east) {
      this.x = (this.x + 1) % this.p.width
    } if (this.dir == this.direction.north) {
      this.y = (this.y + this.p.height - 1) % this.p.height
    } else if (this.dir == this.direction.west) {
      this.x = (this.x + this.p.width - 1) % this.p.width
    }

    if (this.isOn(this.p.get(this.x, this.y))) {
      this.p.set(this.x, this.y, this.off)
      this.dir = (this.dir + 4 - 1) % 4
    } else {
      this.p.set(this.x, this.y, this.on)
      this.dir = (this.dir + 1) % 4
    }
    this.p.updatePixels()
  }

  isColor(pixel, color) {
    return pixel[0] == color.levels[0] && pixel[1] == color.levels[1] && pixel[2] == color.levels[2]
  }

  isOn(pixel) {
    return this.isColor(pixel, this.on)
  }
}

var sketch = function(p) {
  let ant

  const mousePressed = () => {
    ant = new Ant(p)
  }

  p.setup = () => {
    const canvas = p.createCanvas(650, 250)
    ant = new Ant(p)
    canvas.mousePressed(mousePressed)
  }

  p.draw = () => {
    ant.display()
  }
}

new p5(sketch, 'ant')
