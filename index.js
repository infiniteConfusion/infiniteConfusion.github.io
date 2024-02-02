// Get the canvas and 2d context
const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define bubble properties
const bubbleRadius = 30;
const maxBubbles = 4000;
const bubbles = [];

let mouseX, mouseY;

const toolsDiv = document.getElementById('tools');
const movingDiv = document.getElementById('movingDiv');

const toolsDivOffsetTop = toolsDiv.offsetTop;
const movingDivInitialTop = parseFloat(window.getComputedStyle(movingDiv).top);



// Spotlight properties
const spotlight = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 200, // Adjust the radius as needed
};

//const secondlight = {
//    x: canvas.width / 7,
//    y: canvas.height / 4,
//    radius: 50,
//};

// Function to create a bubble
function createBubble(x, y) {
    return {
        x,
        y,
        radius: bubbleRadius,
        color: 'rgba(192, 192, 192, 0)', // Silver color with some transparency
        speedX: Math.random() - 0.5,
        speedY: Math.random() - 0.5,
    };
}

// Function to update the bubbles
function updateBubbles() {
    for (let i = 0; i < bubbles.length; i++) {
        const bubble = bubbles[i];

        // Move bubbles
        bubble.x += bubble.speedX;
        bubble.y += bubble.speedY;

        // Bounce off the walls
        if (bubble.x - bubble.radius < 0 || bubble.x + bubble.radius > canvas.width) {
            bubble.speedX *= -1;
        }

        if (bubble.y - bubble.radius < 0 || bubble.y + bubble.radius > canvas.height) {
            bubble.speedY *= -1;
        }

        const distanceMouse = Math.hypot(bubble.x - mouseX, bubble.y - mouseY);

        if (distanceMouse < 1.5 * bubbleRadius) {
            // Light up bubbles when hovered over
            const alphaMouse = 1 - distanceMouse / (1.5 * bubbleRadius);
            bubble.color = `rgba(20, 20, 20, ${alphaMouse})` 
        } else {
            // Reset bubble color when not hovered over
            bubble.color = 'rgba(192, 192, 192, 0)';
        }

        // Spotlight interaction
        const distanceSpotlight = Math.hypot(bubble.x - spotlight.x, bubble.y - spotlight.y);
        const spotlightRadius = Math.max(320 - 0.5 * window.scrollY, 0);

        if (distanceSpotlight < spotlightRadius && bubble.color === 'rgba(192, 192, 192, 0)') {
            // Light up bubbles within dynamically changing spotlight radius
            const alphaSpotlight = 1 - distanceSpotlight / spotlightRadius;
            bubble.color = `rgba(200, 200, 200, ${alphaSpotlight})`;
        } else if (bubble.color !== 'rgba(192, 192, 192, 0)') {
            // Reset bubble color when not within spotlight
            bubble.color = 'rgba(192, 192, 192, 0)';
        }

//        const buttonlight = Math.hypot(bubble.x - secondlight.x, bubble.y - secondlight.y);

//        if (buttonlight < 3 * bubbleRadius) {
//            const alphaSecondlight = 1 - buttonlight / (3 * bubbleRadius);
//            bubble.color =  `rgba(150, 150, 150, ${alphaSecondlight})`;
//        } 
    }
}

// Function to draw the bubbles
function drawBubbles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bubbles.length; i++) {
        const bubble = bubbles[i];

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0)'; //color of the rim for the bubbles
        ctx.lineWidth = 2;
        ctx.stroke();
    }        
}

function drawSpotlight() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0)'; // Transparent color
    ctx.beginPath();
    ctx.arc(spotlight.x, spotlight.y, spotlight.radius, 0, Math.PI * 2);
    ctx.fill();
}

//function drawSecondlight() {
//    ctx.fillStyle = 'rgba(255, 255, 255, 0)'; // Transparent color
//    ctx.beginPath();
//    ctx.arc(secondlight.x, secondlight.y, secondlight.radius, 0, Math.PI * 2);
//    ctx.fill();
//}

function handleResize() {
    // Update canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    spotlight.x = canvas.width / 2;
    spotlight.y = canvas.height / 2;

//    secondlight.x = canvas.width / 7;
//    secondlight.y = canvas.height / 4;
}

handleResize();

window.addEventListener('resize', handleResize);

// Scroll event listener
window.addEventListener('scroll', () => {
    // Calculate the scroll position
    const scrollPosition = window.scrollY;

    // Move the "movingDiv" up when scrolling down
    movingDiv.style.top = `${movingDivInitialTop - scrollPosition}px`;

    
    const infiniteDiv = document.getElementById('infinite');
    infiniteDiv.style.opacity = Math.min(1 - scrollPosition / 500, 1);

    // Ensure that "tools" div stays in the same place
//    if (scrollPosition > toolsDivOffsetTop) {
//        toolsDiv.style.position = 'fixed';
//        toolsDiv.style.top = '0';
//    } else {
//        toolsDiv.style.position = 'absolute';
//        toolsDiv.style.top = `${toolsDivOffsetTop}px`;
//    }

});

// Create initial bubbles
for (let i = 0; i < maxBubbles; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    bubbles.push(createBubble(x, y));
}

// Animation loop
function animate() {
    updateBubbles();
    drawBubbles();
    drawSpotlight();
//    drawSecondlight();
    requestAnimationFrame(animate);
}

animate();

