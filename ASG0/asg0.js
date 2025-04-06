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
    let x = v.elements[0];
    let y = v.elements[1];
    x = x * 20;
    y = y * 20; // Scale the vector components for better visibility
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
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    ctx.fillStyle = "black"; // Set fill color to black
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the rectangle with the color
    
    let x1 = parseFloat(document.getElementById("x1").value);
    let y1 = parseFloat(document.getElementById("y1").value);
    let x2 = parseFloat(document.getElementById("x2").value);
    let y2 = parseFloat(document.getElementById("y2").value);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
        alert("Invalid input for x or y.");
        return;
    }

    let v1 = new Vector3([x1, y1, 0]); // Create a new vector with x and y components
    let v2 = new Vector3([x2, y2, 0]); // Create a new vector with x2 and y2 components
    handleDrawEvent(v1, "red");
    handleDrawEvent(v2, "blue"); // Draw the second vector in blue
}