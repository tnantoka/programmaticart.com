'use strict'

class Automaton {
  constructor(p) {
    this.p = p

    this.size = 5
    this.grid = []
    this.nextGrid = []
    for (let i = 0; i < p.width / this.size; i++) {
      const line = []
      const nextLine = []
      for (let j = 0; j < p.height / this.size; j++) {
        line.push(0)
        nextLine.push(0)
      }
      this.grid.push(line)
      this.nextGrid.push(nextLine)
    }
 
    p.frameRate(8)
    p.background(0)
    p.fill(255)

    const initials = p.random(this.grid.length * this.grid[0].length * 0.4)
    for (let i = 0; i < initials; i++) {
      const x = Math.floor(p.random(this.grid.length))
      const y = Math.floor(p.random(this.grid[0].length))
      this.grid[x][y] = 1
    }
  }

  display() {
    this.p.background(0)
    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[x].length; y++) {
        if (this.grid[x][y] == 1) {
          this.p.rect(this.size * x, this.size * y, this.size, this.size)
        }

        const n = this.neighbors(x, y)
        if (this.grid[x][y] == 1 && n < 2) {
          this.nextGrid[x][y] = 0
        } else if (this.grid[x][y] == 1 && n > 3) {
          this.nextGrid[x][y] = 0
        } else if (this.grid[x][y] == 0 && n == 3) {
          this.nextGrid[x][y] = 1
        } else {
          this.nextGrid[x][y] = this.grid[x][y]
        }
      }
    }
    this.nextGrid.forEach((line, i) => this.grid[i] = line.slice())
  }

  neighbors(x, y) {
    const width = this.grid.length
    const height = this.grid[x].length

    const north = (y + height - 1) % height
    const south = (y + 1) % height
    const east = (x + 1) % width
    const west = (x + width - 1) % width

    return [
      this.grid[east][north],
      this.grid[east][y],
      this.grid[east][south],
      this.grid[x][north],
      this.grid[x][south],
      this.grid[west][north],
      this.grid[west][y],
      this.grid[west][south]
    ].reduce((a, e) => a + e, 0)
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

new p5(sketch, 'cellular_automaton_2')
