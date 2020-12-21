class ElectricVectorField {
  constructor(width, height, gridSize) {
    this.width = width
    this.height = height
    this.gridSize = gridSize
    this.vectorField = [] // 2D array of p5 vectors
    for (let x = 0; x < this.width / this.gridSize; x++) {
      let vectorRow = []
      for (let y = 0; y < this.height / this.gridSize; y++) {
        vectorRow.push({
          position: createVector(x * this.gridSize + gridSize / 2, y * this.gridSize + gridSize / 2),
          vector: p5.Vector.random2D()
        })

      }
      this.vectorField.push(vectorRow)
    }
  }

  update(charges) {
    for (let x = 0; x < this.vectorField.length; x++) {
      for (let y = 0; y < this.vectorField[x].length; y++) {
        let resultantVector = createVector() // Initially (0, 0)
        for (let i = 0; i < charges.length; i++) {
          let disp = null;
          if (charges[i].polarity == "positive") { // +ve to -ve charge
            disp = p5.Vector.sub(this.vectorField[x][y].position, charges[i].pos)
          } else if (charges[i].polarity == "negative") {
            disp = p5.Vector.sub(charges[i].pos, this.vectorField[x][y].position)
          }
          let dir = disp.copy().normalize()
          let intensity = 5 * (gridSize / 2) / constrain(disp.mag(), gridSize / 2, Infinity) // intensity of lectric field at point is inversely proportional to distance from charge, and scaled by the size of the screen
          // dist contrained to minimum of half gridSize to prevent large numbers
          // scaled by 5

          let force = dir.setMag(intensity)
          resultantVector.add(force)
        }
        resultantVector.mult(1 / charges.length) // normalise
        this.vectorField[x][y].vector = resultantVector
      }
    }
  }

  display() {
    for (let x = 0; x < this.vectorField.length; x++) {
      for (let y = 0; y < this.vectorField[x].length; y++) {
        drawArrow(this.vectorField[x][y].position, this.vectorField[x][y].vector, this.gridSize)
      }
    }
  }

}

function drawArrow(base, vec, gridSize) {
  let displayVec = vec.copy().setMag(0.6 * gridSize)
  let weight = map(Math.pow(vec.mag(), 0.5), 0.0, 1.0, 1, gridSize / 6)
  let myColor = lerpColor(color(73, 235, 167), color(237, 161, 142), Math.pow(vec.mag(), 0.5)) // vec.mag() should be normalised
  // if (vec.mag() >= 1) {
  //   console.log(vec.mag());
  // }
  push();
  stroke(myColor);
  strokeWeight(weight);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, displayVec.x, displayVec.y);
  rotate(vec.heading());
  let arrowSize = gridSize / 6; // 3.5
  translate(displayVec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}