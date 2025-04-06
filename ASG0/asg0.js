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

function handleDrawEvent(v, color) {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    ctx.fillStyle = "black"; // Set fill color to black
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the rectangle with the color
    
    let x = v.elements[0];
    let y = v.elements[1];
    console.log("x: ", x, "y: ", y); // Log the values of x and y
    
    ctx.strokeStyle = color;

    let cx = canvas.width / 2;
    let cy = canvas.height / 2;

    ctx.beginPath(); // Start a new path
    ctx.moveTo(cx, cy); // Move to the center of the canvas
    ctx.lineTo(cx + x, cy + y); // Draw a line to the right
    ctx.stroke(); // Render the path
}

function drawVector() {
    let x = parseFloat(document.getElementById("x").value);
    let y = parseFloat(document.getElementById("y").value);

    if (isNaN(x) || isNaN(y)) {
        alert("Invalid input for x or y.");
        return;
    }

    let v = new Vector3([x, y, 0]); // Create a new vector with x and y components
    handleDrawEvent(v, "red");
}