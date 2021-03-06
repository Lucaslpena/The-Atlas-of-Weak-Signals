function Attractor(weaksignal, xCord, yCord) {
    this.ws = weaksignal;
    var length = width - 2*padding;
    var interval = (length / grid);
    var centerX = padding + interval * (xCord+1);
    centerX = centerX - interval/2;
    length = height - 2*padding;
    interval = (length / grid);
    var centerY = padding + interval * (yCord+1);
    centerY = centerY - interval/2;

    this.pos = createVector(centerX, centerY);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);

    this.mass = 6;
    this.G = 20; //was 80
    this.scaler = 5;

    this.calculateAttraction = function(p){
        //calculate direction of force
        var force = p5.Vector.sub(this.pos, p.pos);



        push();
        var opa = noise(p.offset) * 255;
        // console.log(opa);

        stroke(color(50,50,50,opa));
        // stroke(255);
        line(this.pos.x, this.pos.y, p.pos.x, p.pos.y);
        pop();

        //distance between objects
        var distance = force.mag();

        //limit vector to eliminate extreme values at very close or very far
        // distance = constrain(distance,20,25);
        distance = constrain(distance,50,55);
        //Not really important but is what it is to get direction
        force.normalize();

        //calculate gravitational from magniitude
        var strength = (this.G * this.mass * p.mass) / (distance * distance);

        //get force vector --> magnitude * direction
        force.mult(strength);
        //var force;
        return force;
    }

    this.applyForce = function(force){
        // A = F /M
        var f = force.copy();
        f.div(this.mass);
        this.acc.add(f);
    }

    this.update = function(){
        this.edges();
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0,0);
    }

    this.display = function(){
        push();
        // fill(30,25,20);
        stroke(30,25,30);
        // ellipse(this.pos.x, this.pos.y, this.mass * this.scaler, this.mass * this.scaler);
        // fill(30,25,20);
        textAlign(CENTER, CENTER);
        // text(this.ws, this.pos.x, this.pos.y);
        pop();
    }

    this.edges = function(){
        if (this.pos.y > height) {
            this.vel.y *= -1;
            this.pos = createVector(width/2, height/2);
            this.vel = createVector(0,0);
        }
        if (this.pos.x > width) {
            this.vel.x *= -1;
            this.pos = createVector(width/2, height/2);
            this.vel = createVector(0,0);
        }
        if (this.pos.x < 0) {
            this.vel.x *= -1;
            this.pos = createVector(width/2, height/2);
            this.vel = createVector(0,0);
        }
        if (this.pos.y < 0) {
            this.vel.x *= -1;
            this.pos = createVector(width/2, height/2);
            this.vel = createVector(0,0);
        }
    }

}