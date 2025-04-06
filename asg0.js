function main() {
    // Get <canvas> element
    canvas = document.getElementById("cnv1");
    if (!canvas) {
        console.log("Failed to retrieve the <canvas> element.");
        return;
    }

    // Get the rendering context for 2D rendering
    ctx = canvas.getContext("2d");
    if (!ctx) {
        console.log("Failed to get the rendering context for 2D rendering.");
        return;
    }

    // Draw blue rectangle
    ctx.fillStyle = "black"; // Set fill color to black
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the rectangle with the color
}

function handleDrawEvent() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    ctx.fillStyle = "black"; // Set fill color to black
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the rectangle with the color
    
    let x = document.getElementById("x").value;
    console.log(x);
    let y = document.getElementById("y").value;
    console.log(y);

    ctx.strokeStyle = "red"; // Set stroke color to red

    let cx = canvas.width / 2;
    let cy = canvas.height / 2;

    ctx.beginPath(); // Start a new path
    ctx.moveTo(cx, cy); // Move to the center of the canvas
    ctx.lineTo(cx + x, cy + y); // Draw a line to the right
    ctx.stroke(); // Render the path
}