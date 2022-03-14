let pi = Math.PI;
let _ = undefined;

let rand = (minRange, maxRange) => { return Math.random() * (maxRange - minRange) + minRange }

let rad = (angle) => { return angle * pi / 180 } 
let angl = (radian) => { return radian * 180 / pi }

let dist = (pos1, pos2) => { return Math.sqrt((pos2.x-pos1.x)*(pos2.x-pos1.x) + (pos2.y-pos1.y)*(pos2.y-pos1.y)) }
let hyp = (xComponent, yComponent) => { return Math.sqrt(xComponent * xComponent + yComponent * yComponent) }

let atann = (xComponent, yComponent) => {
    let temp = Math.atan2(yComponent, xComponent);
    
    if (temp < 0) return temp = pi + Math.abs(pi + temp);
    return temp;
}
let angleBetween = (pos1, pos2) => {
    return atann((pos2.x - pos1.x), (pos2.y - pos1.y));
}

class Vector {
    constructor(magnitude, rad) {
        this.magnitude = magnitude;
        this.rad = rad;
        this.angle = angl(rad);
        this.x = magnitude * Math.cos(this.rad);
        this.y = magnitude * Math.sin(this.rad);
    }

    subtract(vector) {
        let x = this.x - vector.x;
        let y = this.y - vector.y;
        return new Vector(hyp(x, y), atann(x, y));
    }
    
    add(vector) {
        let x = this.x + vector.x;
        let y = this.y + vector.y;
        return new Vector(hyp(x, y), atann(x, y));
    }

    multiply(vector) {
        let bx = vector.magnitude * Math.cos(vector.rad);
        let by = vector.magnitude * Math.sin(vector.rad);
        
        let newX = this.x * bx - this.y * by;
        let newY = this.y * bx + this.x * by;
        
        return new Vector(hyp(newX, newY), atann(newX, newY));
    }

    update() {
        this.x = this.magnitude * Math.cos(this.rad);
        this.y = this.magnitude * Math.sin(this.rad);
    }

    show(x, y, color = 'rgba(255,255,255,1)', weight = 1) {
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.strokeWeight = weight;
        ctx.beginPath();

        ctx.moveTo(x, y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();

        let s = 0.25*hyp(this.x - x, this.y - y);

        ctx.beginPath();
        ctx.lineTo(this.x + s * Math.cos(atann(this.x - x, this.y - y) + rad(160)), this.y + s * Math.sin(atann(this.x - x, this.y - y) + rad(160)));
        ctx.lineTo(this.x + s * Math.cos(atann(this.x - x, this.y - y) + rad(200)), this.y + s * Math.sin(atann(this.x - x, this.y - y) + rad(200)));
        ctx.lineTo(this.x, this.y);
        ctx.fill();
    }
}

class Point {
    constructor(xPos, yPos) {
        this.x = xPos;
        this.y = yPos;
    }

    draw(radius = 1, color = 'rgba(255,255,255,1)', weight = 1, fill = false) {
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.strokeWeight = weight;

        ctx.beginPath();
        ctx.moveTo(this.x + radius, this.y);
        ctx.arc(this.x, this.y, radius, 0, 2 * pi);
        if (fill === true) ctx.fill();
        else ctx.stroke();
    }

    connectTo(point, color = 'rgba(255,255,255,1)', weight = 1) {
        ctx.strokeStyle = color;
        ctx.strokeWeight = weight;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
    }
}