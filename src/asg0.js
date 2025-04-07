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
    y = y * 20;
    
    ctx.strokeStyle = color;

    let cx = canvas.width / 2;
    let cy = canvas.height / 2;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + x, cy - y);
    ctx.stroke(); // Render the path
}

function drawVector() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    let x1 = parseFloat(document.getElementById("x1").value);
    let y1 = parseFloat(document.getElementById("y1").value);
    let x2 = parseFloat(document.getElementById("x2").value);
    let y2 = parseFloat(document.getElementById("y2").value);
    let op = document.getElementById("operation-select").value;

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
        alert("Invalid input for x or y.");
        return;
    }

    let v1 = new Vector3([x1, y1, 0]);
    let v2 = new Vector3([x2, y2, 0]);
    handleDrawEvent(v1, "red");
    handleDrawEvent(v2, "blue"); 

    let scalarInput = document.getElementById("Scalar").value;
    let scalar = parseFloat(scalarInput);
    if ((op === "Mul" || op === "Div") && isNaN(scalar)) {
        alert("Invalid input for scalar.");
        return;
    }

    if (op === "Add") {
        let v3 = new Vector3([x1, y1, 0]).add(v2);
        handleDrawEvent(v3, "green");
    }
    else if (op === "Sub") {
        let v3 = new Vector3([x1, y1, 0]).sub(v2);
        handleDrawEvent(v3, "green");
    }
    else if (op === "Mul") {
        let v3 = new Vector3([x1, y1, 0]).mul(scalar);
        let v4 = new Vector3([x2, y2, 0]).mul(scalar);
        handleDrawEvent(v3, "green");
        handleDrawEvent(v4, "green");
    }
    else if (op === "Div") {
        let v3 = new Vector3([x1, y1, 0]).div(scalar);
        let v4 = new Vector3([x2, y2, 0]).div(scalar);
        handleDrawEvent(v3, "green");
        handleDrawEvent(v4, "green");
    }
    else if (op === "Magnitude") {
        let mag1 = new Vector3([x1, y1, 0]).magnitude();
        let mag2 = new Vector3([x2, y2, 0]).magnitude();
        console.log("Magnitude v1: " + mag1 + "\nMagnitude v2: " + mag2);
    }
    else if (op === "Normalize") {
        let v3 = new Vector3([x1, y1, 0]).normalize();
        let v4 = new Vector3([x2, y2, 0]).normalize();
        handleDrawEvent(v3, "green");
        handleDrawEvent(v4, "green"); 
    }
    else if (op === "AngleBetween") {
        let angle = angleBetween(v1, v2);
        console.log("Angle between v1 and v2: " + angle + " degrees");
    }
    else if (op === "Area") {
        let area = areaTriangle(v1, v2);
        console.log("Area of triangle: " + area);
    }
}

/// Used ChatGPT to help with this angleBetween function 
function angleBetween(v1, v2) {
    let dotProduct = Vector3.dot(v1, v2);
    let mag1 = v1.magnitude();
    let mag2 = v2.magnitude();
    console.log(dotProduct);
    if (mag1 === 0 || mag2 === 0) {
        return 0;
    }
    let cosTheta = dotProduct / (mag1 * mag2);
    cosTheta = Math.max(-1, Math.min(1, cosTheta));
    let angleDeg = Math.acos(cosTheta) * (180 / Math.PI);
    return angleDeg;
}

// Used ChatGPT to get the right syntax for this function
function areaTriangle(v1, v2) {
    let crossVec = Vector3.cross(v1, v2);
    let areaTriangle = crossVec.magnitude() / 2;
    return areaTriangle;
}