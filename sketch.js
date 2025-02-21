// MINIMAL

let textContent = "Three concentric arches. The outside one is blue; the middle red; and the inside one is yellow.";
let colorPicker, weightSlider, clearButton, undoButton, linkButton;
let drawing = false;
let drawAreaSize = 600;
let drawAreaX, drawAreaY;
let lines = []; // Initialize the lines array

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorPicker = createColorPicker('#000000'); // Default black
  colorPicker.position(10, 460);
  
  // weight of drawing pen
  weightSlider = createSlider(1, 10, 2);
  weightSlider.position(80, 460);
  
  // Create clear button
  clearButton = createButton('Clear Drawing');
  clearButton.position(10, 500);
  clearButton.mousePressed(() => lines = []);

  // Create undo button (now erase)
  undoButton = createButton('Erase');
  undoButton.position(120, 500);
  undoButton.mousePressed(() => lines.pop());

  // Create the link button
  linkButton = createButton('View Image');
  linkButton.position(10, 540);
  linkButton.mousePressed(() => window.open('https://massmoca.org/event/walldrawing579/', '_blank'));

  drawAreaX = windowWidth / 2;
  drawAreaY = (windowHeight - drawAreaSize) / 2; // Keeping your original positioning
}

function draw() {
  background(0);
  
  // Draw text content separately
  push();
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text(textContent, 10, 180, windowWidth / 2 - 10);
  pop();
  
  // Draw the drawing area
  fill(255);
  noStroke();
  rect(drawAreaX, drawAreaY, drawAreaSize, drawAreaSize);
  
  // Draw previous lines
  for (let l of lines) {
    stroke(l.color);
    strokeWeight(l.weight);
    line(l.x1, l.y1, l.x2, l.y2);
  }
}

function mousePressed() {
  if (mouseX > drawAreaX && mouseX < drawAreaX + drawAreaSize && 
      mouseY > drawAreaY && mouseY < drawAreaY + drawAreaSize) {
    drawing = true;
  }
}

function mouseDragged() {
  if (drawing) {
    let constrainedMouseX = constrain(mouseX, drawAreaX, drawAreaX + drawAreaSize);
    let constrainedMouseY = constrain(mouseY, drawAreaY, drawAreaY + drawAreaSize);
    let constrainedPmouseX = constrain(pmouseX, drawAreaX, drawAreaX + drawAreaSize);
    let constrainedPmouseY = constrain(pmouseY, drawAreaY, drawAreaY + drawAreaSize);
    
    lines.push({
      x1: constrainedPmouseX, 
      y1: constrainedPmouseY,
      x2: constrainedMouseX, 
      y2: constrainedMouseY,
      color: colorPicker.value(),
      weight: weightSlider.value()
    });
  }
}

function mouseReleased() {
  drawing = false;
}
