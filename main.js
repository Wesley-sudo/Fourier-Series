const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

// Variables to change
let SVGPoints = Wesulipoints;
let xOffset = 265;
let yOffset = 200;
let N = 520; // as close to SVGPoints.length as possible

// Lists
let coefficientVectors = [];
let vectors = [];
let points = [];

// Time related Variables
let fps = 240;
let time = 0;
const dt = (2*pi / N)/2;

addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

let preparePoints = () => {
    for (let p = 0; p < SVGPoints.length; p++){
        let mag = hyp(SVGPoints[p][0] - xOffset, SVGPoints[p][1] - yOffset);
        let theta = atann(SVGPoints[p][0] - xOffset, SVGPoints[p][1] - yOffset);

        // Creates new Vectors in the vectors List
        if (!Number.isNaN(mag) || !Number.isNaN(theta)) vectors.push(new Vector(mag, theta));
    }
    // Use the Fourier Series function to get the complex constants. (Refer to 3 Blue 1 Brown Youtube Tutorial about Fourier Series)
    coefficientVectors = fourier(vectors, N);
}
preparePoints();

// Creates the wipers or Sine and Cosine Rotating Vectors
let wipers = new Wiper({ x: canvas.width/2, y: canvas.height/2 }, coefficientVectors, 0, N, points);

let drawLines = () => {
    if (points.length > 2) {
        let color;
        for (let i = 0; i < points.length - 1; i++){
            // Drawing the lines in between of every points obtained at the very tip of the wipers
            color = `rgba(255,255,0,${1 - i*0.00075})`;
            points[i].connectTo(points[i+1], color);
        }
    }
}

// Simulation Starts
setInterval(function () { 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    wipers.update(time);
    wipers.showCircle('rgba(5,195,221,0.25)');
    wipers.showVector(_, 5);

    drawLines();
    if (points.length > N*2) {
        points.pop();
    }

    time += dt;
}, 1000/fps);

