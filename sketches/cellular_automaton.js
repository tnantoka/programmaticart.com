'use strict'

class Automaton {
  constructor(p) {
    this.p = p
    // this.rules = [0, 0, 0, 1, 1, 1, 1, 0]
    this.rules = []
    for (let i = 0; i < 8; i++) {
      this.rules.push(p.random([0, 1]))
    }
    this.gen = 1
    this.on = p.color(255)
    this.off = p.color(0)

    this.size = 5
    this.grid = []
    for (let i = 0; i < p.height / this.size; i++) {
      const line = []
      for (let j = 0; j < p.width / this.size; j++) {
        line.push(0)
      }
      this.grid.push(line)
    }

    p.frameRate(8)
    p.background(0)
    setTimeout(() => p.loop(), 0)
    // p.set(p.width / 2, 0, this.on)
    if (p.random([0, 1]) == 0) {
      this.grid[0][Math.floor(this.grid[0].length / 2)] = 1
    } else {
      const initials = p.random(this.grid[0].length)
      for (let i = 0; i < initials; i++) {
        this.grid[0][Math.floor(p.random(this.grid[0].length - 1))] = 1
      }
    }
    // p.updatePixels()
    this.draw(0)
  }

  display() {
    // if (this.gen > this.p.height - 1) {
    if (this.gen > this.grid.length - 1) {
      this.p.noLoop()
      return
    }
    // for (let x = 1; x < this.p.width - 1; x++) {
    for (let x = 1; x < this.grid[this.gen].length - 1; x++) {
      // const left = this.p.get(x - 1, this.gen - 1)
      // const me = this.p.get(x, this.gen - 1)
      // const right = this.p.get(x + 1, this.gen - 1)
      const left = this.grid[this.gen - 1][x - 1]
      const me = this.grid[this.gen - 1][x]
      const right = this.grid[this.gen - 1][x + 1]
      if (this.evaluate(left, me, right) == 1) {
        // this.p.set(x, this.gen, this.on)
        this.grid[this.gen][x] = 1
      }
      // this.p.updatePixels()
    }
    this.draw(this.gen)
    this.gen++
  }

  draw(gen) {
    this.grid[gen].forEach((cell, i) => {
      if (cell == 1) {
        this.p.rect(this.size * i, this.size * gen, this.size, this.size)
      }
    })
  }

  isColor(pixel, color) {
    return pixel[0] == color.levels[0] && pixel[1] == color.levels[1] && pixel[2] == color.levels[2]
  }

  isOn(pixel) {
    return pixel == 1
    return this.isColor(pixel, this.on)
  }

  isOff(pixel) {
    return pixel == 0
    return this.isColor(pixel, this.off)
  }


  evaluate(a, b, c) {
    let i = 0
    if (this.isOn(a) && this.isOn(b) && this.isOn(c)) i = 0
    if (this.isOn(a) && this.isOn(b) && this.isOff(c)) i = 1
    if (this.isOn(a) && this.isOff(b) && this.isOn(c)) i = 2
    if (this.isOn(a) && this.isOff(b) && this.isOff(c)) i = 3
    if (this.isOff(a) && this.isOn(b) && this.isOn(c)) i = 4
    if (this.isOff(a) && this.isOn(b) && this.isOff(c)) i = 5
    if (this.isOff(a) && this.isOff(b) && this.isOn(c)) i = 6
    if (this.isOff(a) && this.isOff(b) && this.isOff(c)) i = 7
    return this.rules[i]
  }
}

var sketch = function(p) {
  let automaton

  const mousePressed = () => {
    automaton = new Automaton(p)
  }

  p.setup = () => {
    const canvas = p.createCanvas(650, 250)
    automaton = new Automaton(p)
    canvas.mousePressed(mousePressed)
  }

  p.draw = () => {
    automaton.display()
  }
}

new p5(sketch, 'cellular_automaton')
