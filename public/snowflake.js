function Snowflake(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.s = random(1, 25);
  this.tex = random(tex);
  this.rv = 0;
  this.r = 0;
}

Snowflake.prototype.draw = function(f) {
  push();
  translate(this.pos.x, this.pos.y);
  rotate(this.r);
  image(this.tex, 0, 0);
  pop();
}

Snowflake.prototype.update = function(f) {
  this.pos.add(this.vel);
  this.rv += map(noise(this.pos.x/100, frameCount/1000), 0, 1, -0.01, 0.01);
  this.rv *= 0.99;
  this.r += this.rv
  this.vel.add(0, Gravity*this.s/25);
  this.vel.add(map(noise(this.pos.x/100, this.pos.y/100, frameCount/1000), 0, 1, -0.1, 0.1), 0);
  this.vel.mult(Drag);
}

Snowflake.prototype.applyForce = function(f) {
  this.vel.add(f);
}
