class Wiper{
    constructor(coordinate, coefficientVectors, freq, N, points) {
        this.freq = -freq;
        this.vector = coefficientVectors[this.freq + N / 2];
        this.vector.magnitude *= 2;
        this.x = coordinate.x;
        this.y = coordinate.y;

        if (Math.abs(this.freq) >= N / 2 - 1) {
            this.last = true;
        }
        else {
            // This If Statements was used to make sure the vectors alternate between + and - rotations
            if (this.freq === 0) {
                this.nextWiper = new Wiper({ x: this.x + this.vector.x, y: this.y + this.vector.y },
                    coefficientVectors, this.freq - 1, N, points);
                this.last = false;
            }
            else if (this.freq > 0) {
                this.nextWiper = new Wiper({ x: this.x + this.vector.x, y: this.y + this.vector.y },
                    coefficientVectors, this.freq, N, points);
                this.last = false;
            }
            else if (this.freq < 0) {
                this.nextWiper = new Wiper({ x: this.x + this.vector.x, y: this.y + this.vector.y },
                    coefficientVectors, this.freq - 1, N, points);
                this.last = false;
            }
        }
    }

    update(time, x, y) {
        if (this.freq === 0) {
            this.vector.x = this.x + this.vector.magnitude * Math.cos(this.freq * time + this.vector.rad);
            this.vector.y = this.y + this.vector.magnitude * Math.sin(this.freq * time + this.vector.rad);
        }
        else {
            this.x = x;
            this.y = y;

            this.vector.x = this.x + this.vector.magnitude * Math.cos(this.freq * time + this.vector.rad);
            this.vector.y = this.y + this.vector.magnitude * Math.sin(this.freq * time + this.vector.rad);
        }

        // As long as this is not the last iteration, proceed to update the next wiper
        if (this.last === false) this.nextWiper.update(time, this.vector.x, this.vector.y);
        // If this is the last iteration, push the point to the Points[] List
        else return points.unshift(new Point(this.vector.x, this.vector.y));
    }

    showCircle(color = 'rgba(255,255,255,1)', weight = 1, fill = false) {
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.strokeWeight = weight;

        // Shows the Circles enlcosing the wipers
        if (this.freq !== 0) {
            ctx.beginPath();
            ctx.moveTo(this.x + this.vector.magnitude, this.y);
            ctx.arc(this.x, this.y, this.vector.magnitude, 0, 2 * pi);
            if (fill === true) ctx.fill();
            else ctx.stroke();
        }

        // As long as this is not the last iteration, proceed to passing the parameters to the next wiper
        if (this.last === false) this.nextWiper.showCircle(color, weight, fill);
    }

    showVector(color = 'rgba(255,255,255,1)', weight = 1) {

        // Shows the Vector as arrows for every wiper
        if (this.freq !== 0) this.vector.show(this.x, this.y, color, weight);

        // As long as this is not the last iteration, proceed to passing the parameters to the next wiper
        if (this.last === false) this.nextWiper.showVector(color, weight);
    }
}