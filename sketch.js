let DIS_WIDTH = 1290;
let DIS_HEIGHT = 720;
let FPS = 24;
let debug = true;
let aesthetics = true;
let vectorField;
let gridSize = 30; // Ideally multiple of DIS_WIDTH & DIS_HEIGHT
let charges = []
let numPositiveCharges = 2
let numNegativeCharges = 2
let numTotalCharges = numPositiveCharges + numNegativeCharges

function setup() {
  createCanvas(DIS_WIDTH, DIS_HEIGHT);
  frameRate(FPS);

  // Initialise vector field
  vectorField = new ElectricVectorField(DIS_WIDTH, DIS_HEIGHT, gridSize)

  for (let i = 0; i < numPositiveCharges; i++) {
    charges.push(new ChargeParticle(DIS_WIDTH, DIS_HEIGHT, "positive"))
  }
  for (let i = 0; i < numNegativeCharges; i++) {
    charges.push(new ChargeParticle(DIS_WIDTH, DIS_HEIGHT, "negative"))
  }
}

function draw() {
  background(20);

  for (var i = 0; i < charges.length; i++) {
    let force = p5.Vector.add(p5.Vector.random2D(), p5.Vector.sub(createVector(DIS_WIDTH / 2, DIS_HEIGHT / 2), charges[i].pos).mult(0.001))
    push()
    translate(charges[i].pos.x, charges[i].pos.y)
    strokeWeight(1)
    stroke(255)
    line(0, 0, force.x, force.y)
    pop()
    charges[i].applyForce(force)
    charges[i].update()
  }

  vectorField.update(charges)
  vectorField.display()

  for (var i = 0; i < charges.length; i++) {
    charges[i].show()
  }
  // noLoop()
}


loopBool = true;

function keyPressed() {
  if (key == " ") {
    if (loopBool) {
      noLoop();
      loopBool = !loopBool;
    } else {
      loop();
      loopBool = !loopBool;
    }
  } else if (key == 'd') {
    debug = !debug;
  } else if (key == 'a') {
    aesthetics = !aesthetics;
  }
}