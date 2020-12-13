class ChargeParticle {
  constructor(screenWidth, screenHeight, polarity) {
    this.xBounds = 0.2 * screenWidth
    this.yBounds = 0.2 * screenHeight
    this.pos = createVector(random(this.xBounds, screenWidth - this.xBounds), random(this.yBounds, screenHeight - this.yBounds));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = random(2, 5)
    this.polarity = polarity

    this.radius = 20;
    this.color = null
    if (this.polarity == 'positive') {
      this.color = color(242, 44, 107)
    } else if (this.polarity == 'negative') {
      this.color = color(61, 197, 224)
    }
  }

  show() {
    noStroke()
    fill(this.color)
    circle(this.pos.x, this.pos.y, this.radius);

  }

  applyForce(force) { // force argument should be a p5 Vector
    this.acc.add(force.mult(1 / this.mass))
  }

  update() {
    this.vel.add(this.acc)
    this.acc.setMag(0)
    this.pos.add(this.vel)
  }
}