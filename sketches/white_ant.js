'use strict'

class Ant {
  constructor(p, point) {
    this.p = p

    this.angles = [
      [ 0, 1 ],
      [ 1, 1 ],
      [ 1, 0 ],
      [ 1, -1 ],
      [ 0, -1 ],
      [ -1, -1 ],
      [ -1, 0 ],
      [ -1, 1 ],
    ]
    this.white = p.color(255)
    this.black = p.color(0)

    this.dir = 0
    this.x = this.nextX = p.width / 2
    this.y = this.nextY = p.height / 2

    p.background(255)

    setTimeout(() => {
      const initials = p.random(p.width * p.height * 0.5)
      for (let i = 0; i < initials; i++) {
        const x = p.random(p.width)
        const y = p.random(p.height)
        p.set(x, y, this.black)
      }
      this.p.updatePixels()
    }, 0)
  }

  display() {
    const step = this.p.random([-1, 0, 1])
    this.dir = (this.dir + step + this.angles.length) % this.angles.length
    this.nextX = (this.nextX + this.angles[this.dir][0] + this.p.width) % this.p.width
    this.nextY = (this.nextY + this.angles[this.dir][1] + this.p.height) % this.p.height

    if (this.isBlack(this.p.get(this.x, this.y)) && this.isWhite(this.p.get(this.nextX, this.nextY))) {
      this.p.set(this.x, this.y, this.white)
      this.p.set(this.nextX, this.nextY, this.black)
      this.p.updatePixels()
      this.x = this.nextX
      this.y = this.nextY
    } else if (this.isBlack(this.p.get(this.x, this.y)) && this.isBlack(this.p.get(this.nextX, this.nextY))) {
      this.dir = (this.dir + this.angles.length / 2) % this.angles.length 
      this.x = (this.x + this.angles[this.dir][0] + this.p.width) % this.p.width
      this.y = (this.y + this.angles[this.dir][1] + this.p.height) % this.p.height
    } else {
      this.x = this.nextX
      this.y = this.nextY
    }
    this.nextX = this.x
    this.nextY = this.y
  }

  isColor(pixel, color) {
    return pixel[0] == color.levels[0] && pixel[1] == color.levels[1] && pixel[2] == color.levels[2]
  }

  isBlack(pixel) {
    return this.isColor(pixel, this.black)
  }

  isWhite(pixel) {
    return this.isColor(pixel, this.white)
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

new p5(sketch, 'white_ant')
