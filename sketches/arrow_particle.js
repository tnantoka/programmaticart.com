'use strict'

class Particle {
  constructor(p, point, velocity, radius) {
    this.p = p
    this.point = Object.assign({}, point)
    this.velocity = velocity
    this.radius = radius
    this.gravity = 0.1
  }

  update() {
    this.velocity.y += this.gravity
    this.point.x += this.velocity.x
    this.point.y += this.velocity.y
  }

  display() {
    this.p.ellipse(this.point.x, this.point.y, this.radius * 2, this.radius * 2)
  }
}

class RegenerateParticle extends Particle {
  constructor(p, point, velocity, radius, origin) {
    super(p, point, velocity, radius)
    this.origin = origin
  }

  update() {
    super.update()
    this.regenerate()
  }

  regenerate() {
    const inFrame = {
      x: (this.point.x < this.p.width + this.radius) && (this.point.x > this.radius),
      y: (this.point.y < this.p.height + this.radius) && (this.point.y > -this.radius),
    }
    if (inFrame.x && inFrame.y) return
    this.point = Object.assign({}, this.origin)
    this.velocity = {
      x: this.p.random(-1, 1),
      y: this.p.random(-4, 2),
    }
  }
}

class BounceParticle extends Particle {
  constructor(p, point, velocity, radius) {
    super(p, point, velocity, radius)
    this.friction = 0.99
  }

  update() {
    this.velocity.x *= this.friction
    this.velocity.y *= this.friction
    super.update()
    this.bounce()
  }

  bounce() {
     if ((this.point.x > this.p.width - this.radius) && (this.point.x < this.radius)) {
       this.velocity.x *= -1
       this.point.x = this.p.constrain(this.point.x, this.radius, this.p.width - this.radius)
     }
     if (this.point.y > this.p.height - this.radius) {
       this.velocity.y *= -1
       this.point.y = this.p.height - this.radius
     }
  }
}

class ArrowParticle extends Particle {
  constructor(p, point, velocity, radius) {
    super(p, point, velocity, radius)
    this.angle = 0
    this.length = 20
  }

  update() {
    super.update()
    this.angle = this.p.atan2(this.velocity.x, this.velocity.y)
  }

  display() {
    this.p.push()
    this.p.stroke(255)
    this.p.translate(this.point.x, this.point.y)
    this.p.rotate(this.angle)
    this.p.scale(this.length)
    this.p.strokeWeight(1 / this.length)
    this.p.line(0, 0, 1, 0)
    this.p.line(1, 0, 0.7, -0.3)
    this.p.line(1, 0, 0.7, 0.3)
    this.p.pop()
  }
}

class Particles {
  constructor(p) {
    this.p = p
    this.particles = [
      new Particle(p, { x: 0, y: p.height }, { x: 2.2, y: -4.2 }, 20)
    ] 

    const center = { x: p.width / 2, y: p.height / 2 }

    for (let i = 0; i < 100; i++) {
      const velocity = {
        x: this.p.random(-1, 1),
        y: -i,
      }
      const particle = new RegenerateParticle(p, center, velocity, 5.0, center)
      this.particles.push(particle)
    }

    for (let i = 0; i < 50; i++) {
      const velocity = {
        x: this.p.random(-2, 2),
        y: -i,
      }
      const particle = new BounceParticle(p, center, velocity, 2.2)
      this.particles.push(particle)
    }

    for (let i = 0; i < 50; i++) {
      const velocity = {
        x: this.p.random(1, 8),
        y: this.p.random(-5, -1),
      }
      const particle = new ArrowParticle(p, { x: 0, y: center.y }, velocity, 2.2)
      this.particles.push(particle)
    }

    p.clear()
    p.noStroke()
    p.background(0)
  }

  display() {
    this.p.fill(0, 12)
    this.p.rect(0, 0, this.p.width, this.p.height)

    this.p.fill(255)
    // this.p.background(0)
    this.particles.forEach(p => p.update())
    this.particles.forEach(p => p.display())
  }
}

var sketch = function(p) {
  let particles 

  const mousePressed = () => {
    particles = new Particles(p)
  }

  p.setup = () => {
    const canvas = p.createCanvas(650, 250)
    particles = new Particles(p)
    canvas.mousePressed(mousePressed)
  }

  p.draw = () => {
    particles.display()
  }
}

new p5(sketch, 'arrow_particle')
