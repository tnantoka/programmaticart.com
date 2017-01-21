class Spiral {
  constructor() {
    this.gap = random(10, 20)
    this.thickness = 1
    this.arcLength = random(0.1, 5.0)
  }

  display() {
    clear()
    stroke(0)
    noFill()
    strokeWeight(this.thickness)
    for (let i = this.gap; i < width; i += this.gap) {
      const radian = radians(i)
      arc(width / 2, height / 2, i, i, radian, radian + this.arcLength)
    }
  }
}

var spiral

function setup() {
  const canvas = createCanvas(650, 250)
  canvas.parent('gapped_spiral')
  spiral = new Spiral()
  canvas.mousePressed(onMousePressed)
}

function draw() {
  spiral.display()
}

function onMousePressed() {
  spiral = new Spiral()
}
