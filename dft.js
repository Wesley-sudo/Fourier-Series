let fourier = (signalVectors, N) => {
    let complexConstants = [];
    let increment = 2 * pi / N;

    // For every frequency were 0 frequency at the middle
    for (let n = -N/2; n < N/2; n++){
        let aveX = 0.0;
        let aveY = 0.0;

        // For every vector in the vectors[] list, get the average with respect to a specific frequency
        for (let i = 0; i < N; i++){
            let bx = Math.cos((-n) * (i * increment));
            let by = Math.sin((-n) * (i * increment));
            
            aveX = aveX + signalVectors[i].x * bx - signalVectors[i].y * by;
            aveY = aveY + signalVectors[i].y * bx + signalVectors[i].x * by;
        }
        aveX = aveX / N;
        aveY = aveY / N;
    
        complexConstants.push(new Vector(hyp(aveX, aveY), atann(aveX, aveY)));
    }

    return complexConstants;
}