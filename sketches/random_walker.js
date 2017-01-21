class Walker {
  constructor() {
    this.x = width / 2
    this.y = height / 2
  }

  display() {
    stroke(0)
    point(this.x, this.y)
  }

  step() {
    const choise = random([0, 1, 2, 3])
    switch(choise) {
      case 0:
        this.x++
        break
      case 1:
        this.x--
        break
      case 2:
        this.y++
        break
      case 3:
        this.y--
        break
    }
  }
}

var walker
var stopped = false

function setup() {
  const canvas = createCanvas(650, 250)
  canvas.parent('random_walker')
  walker = new Walker()
  canvas.mousePressed(onMousePressed)
}

function draw() {
  walker.step()
  walker.display()
}

function onMousePressed() {
  stopped ? loop() : noLoop()
  stopped = !stopped
}
