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
    let op = document.getElementById("operation-select").value; // Get the selected operation

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
        alert("Invalid input for x or y.");
        return;
    }

    let v1 = new Vector3([x1, y1, 0]); // Create a new vector with x and y components
    let v2 = new Vector3([x2, y2, 0]); // Create a new vector with x2 and y2 components
    handleDrawEvent(v1, "red");
    handleDrawEvent(v2, "blue"); // Draw the second vector in blue

    let scalarInput = document.getElementById("Scalar").value; // Get the scalar value
    let scalar = parseFloat(scalarInput); // Parse the scalar value
    if ((op === "Mul" || op === "Div") && isNaN(scalar)) {
        alert("Invalid input for scalar.");
        return;
    }

    if (op === "Add") {
        let v3 = new Vector3([x1, y1, 0]).add(v2); // Add the two vectors
        handleDrawEvent(v3, "green"); // Draw the result in green
    }
    else if (op === "Sub") {
        let v3 = new Vector3([x1, y1, 0]).sub(v2); // Subtract the second vector from the first
        handleDrawEvent(v3, "green"); // Draw the result in green
    }
    else if (op === "Mul") {
        let v3 = new Vector3([x1, y1, 0]).mul(scalar); // Multiply the first vector by the scalar
        let v4 = new Vector3([x2, y2, 0]).mul(scalar); // Multiply the second vector by the scalar
        handleDrawEvent(v3, "green"); // Draw the result in green
        handleDrawEvent(v4, "green"); // Draw the result in green
    }
    else if (op === "Div") {
        let v3 = new Vector3([x1, y1, 0]).div(scalar); // Divide the first vector by the scalar
        let v4 = new Vector3([x2, y2, 0]).div(scalar); // Divide the second vector by the scalar
        handleDrawEvent(v3, "green"); // Draw the result in green
        handleDrawEvent(v4, "green"); // Draw the result in green
    }
    else if (op === "Magnitude") {
        let mag1 = new Vector3([x1, y1, 0]).magnitude(); // Calculate the magnitude of the first vector
        let mag2 = new Vector3([x2, y2, 0]).magnitude(); // Calculate the magnitude of the second vector
        console.log("Magnitude v1: " + mag1 + "\nMagnitude v2: " + mag2); // Display the magnitudes
    }
    else if (op === "Normalize") {
        let v3 = new Vector3([x1, y1, 0]).normalize(); // Normalize the first vector
        let v4 = new Vector3([x2, y2, 0]).normalize(); // Normalize the second vector
        handleDrawEvent(v3, "green"); // Draw the result in green
        handleDrawEvent(v4, "green"); // Draw the result in green
    }
    else if (op === "AngleBetween") {
        let angle = angleBetween(v1, v2); // Calculate the angle between the two vectors
        console.log("Angle between v1 and v2: " + angle + " degrees"); // Display the angle
    }
    else if (op === "Area") {
        let area = areaTriangle(v1, v2); // Calculate the area of the triangle formed by the two vectors
        console.log("Area of triangle: " + area); // Display the area
    }
}

function angleBetween(v1, v2) {
    let dotProduct = Vector3.dot(v1, v2); // Calculate the dot product of the two vectors
    let mag1 = v1.magnitude(); // Calculate the magnitude of the first vector
    let mag2 = v2.magnitude(); // Calculate the magnitude of the second vector
    console.log(dotProduct); // Log the magnitudes of the vectors
    if (mag1 === 0 || mag2 === 0) {
        return 0; // Return 0 if either vector has zero magnitude
    }
    let cosTheta = dotProduct / (mag1 * mag2); // Calculate the cosine of the angle
    cosTheta = Math.max(-1, Math.min(1, cosTheta)); // Clamp the value to the range [-1, 1]
    let angleDeg = Math.acos(cosTheta) * (180 / Math.PI); // Calculate the angle in degrees
    return angleDeg; // Return the angle in degrees
}

function areaTriangle(v1, v2) {
    let crossVec = Vector3.cross(v1, v2); // Calculate the cross product of the two vectors
    let areaTriangle = crossVec.magnitude() / 2; // Calculate the area of the triangle
    return areaTriangle; // Return the area of the triangle
}