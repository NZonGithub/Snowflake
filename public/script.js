let snow = [];
let tex = [];
let layer;
let spacing = 12*5;
let atlas;

const Gravity = 0.25;
const Drag = 0.99;

function preload() {
  atlas = loadImage('FlakeSheet.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  fill(255);
  noStroke();
  imageMode(CENTER);
  for (let x = 0; x < atlas.width; x += 32) {
    for (let y = 0; y < atlas.height; y += 32) {
      tex.push(atlas.get(x, y, 32, 32));
    }
  }
  layer = new Float64Array(round(width/spacing)+1);
  for (let x = 0; x < layer.length; x++) {
    layer[x] = height;
  }
}

function draw() {
  background(0);
  for (let i = 0; i < snow.length; i++) {
    let f = snow[i];
    f.draw();
    f.update();
    if (f.pos.y - f.s > height) {
      if (f.pos.x > 0 && f.pos.x < width) {
        layer[snap(f.pos.x, 12)/12] -= 1;
      }
      snow.splice(i, 1);
    }
  }
  layer.smoothen();
  beginShape();
  vertex(0, height);
  for (let x = 0; x < layer.length; x++) {
    vertex(x*spacing, layer[x]);
  }
  vertex(width, height)
  endShape(CLOSE);
  if (mouseIsPressed) {
    snow.push(new Snowflake(mouseX, mouseY));
  }
  snow.push(new Snowflake(random(width), 0));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  layer = new Float64Array(round(width/spacing)+1);
  for (let x = 0; x < layer.length; x++) {
    layer[x] = height;
  }
}

function snap(v, a) {
  return round(v/a)*a;
}

Float64Array.prototype.smoothen = function() {
  let avg = this.sum() / this.length;
  for (let i = 0; i < this.length; i++) {
    // this[i] += constrain(this[i]-avg, 0, 0.1);
    this[i] = lerp(this[i], avg, 0.0001);
  }
}

Float64Array.prototype.sum = function() {
  return this.reduce((t, v) => {
    return t + v;
  });
}

// function limit(v, a) {
//   let aa = Math.abs(a);
//   return (v > 0) ? (v > aa) ? -aa : -v : (-v > aa) ? -aa : -v;
// }
