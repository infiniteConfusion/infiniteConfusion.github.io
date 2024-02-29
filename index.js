const canvas = document.getElementById('bubbleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bubbleRadius = 30;
const maxBubbles = 4000;
const bubbles = [];

let mouseX, mouseY;

const movingDiv = document.getElementById('movingDiv');

const movingDivInitialTop = parseFloat(window.getComputedStyle(movingDiv).top);

const optionsDiv = document.getElementById('options');
const chooseDiv = document.getElementById('choose');

const spotlight = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 200, 
};

function createBubble(x, y) {
    return {
        x,
        y,
        radius: bubbleRadius,
        color: 'rgba(192, 192, 192, 0)', 
        speedX: Math.random() - 0.5,
        speedY: Math.random() - 0.5,
    };
}

function updateBubbles() {
    for (let i = 0; i < bubbles.length; i++) {
        const bubble = bubbles[i];

        bubble.x += bubble.speedX;
        bubble.y += bubble.speedY;

        if (bubble.x - bubble.radius < 0 || bubble.x + bubble.radius > canvas.width) {
            bubble.speedX *= -1;
        }

        if (bubble.y - bubble.radius < 0 || bubble.y + bubble.radius > canvas.height) {
            bubble.speedY *= -1;
        }

        const distanceMouse = Math.hypot(bubble.x - mouseX, bubble.y - mouseY);

        if (distanceMouse < 1.5 * bubbleRadius) {
            const alphaMouse = 1 - distanceMouse / (1.5 * bubbleRadius);
            bubble.color = `rgba(20, 20, 20, ${alphaMouse})` 
        } else {
            bubble.color = 'rgba(192, 192, 192, 0)';
        }

        const distanceSpotlight = Math.hypot(bubble.x - spotlight.x, bubble.y - spotlight.y);
        const spotlightRadius = Math.max(320 - 0.5 * window.scrollY, 0);

        if (distanceSpotlight < spotlightRadius && bubble.color === 'rgba(192, 192, 192, 0)') {
            const alphaSpotlight = 1 - distanceSpotlight / spotlightRadius;
            bubble.color = `rgba(200, 200, 200, ${alphaSpotlight})`;
        } else if (bubble.color !== 'rgba(192, 192, 192, 0)') {
            bubble.color = 'rgba(192, 192, 192, 0)';
        }
    }
}

function drawBubbles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bubbles.length; i++) {
        const bubble = bubbles[i];

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0)'; 
        ctx.lineWidth = 2;
        ctx.stroke();
    }        
}

function drawSpotlight() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0)'; 
    ctx.beginPath();
    ctx.arc(spotlight.x, spotlight.y, spotlight.radius, 0, Math.PI * 2);
    ctx.fill();
}

function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    spotlight.x = canvas.width / 2;
    spotlight.y = canvas.height / 2;

}

handleResize();

window.addEventListener('resize', handleResize);

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;


    if (scrollPosition > window.innerHeight / 2) {
        movingDivOpacity = Math.min((scrollPosition - window.innerHeight / 2) / 500, 1); // Adjust 500 as needed
    } else {
        movingDivOpacity = 0
    }

    movingDiv.style.opacity = movingDivOpacity.toFixed(2);

    const infiniteDiv = document.getElementById('infinite');
    infiniteDiv.style.opacity = Math.min(1 - scrollPosition / 500, 1);

});

optionsDiv.addEventListener('click', () => {
    chooseDiv.classList.toggle('show');
    chooseDiv.classList.toggle('enlarge');
});

for (let i = 0; i < maxBubbles; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    bubbles.push(createBubble(x, y));
}

function animate() {
    updateBubbles();
    drawBubbles();
    drawSpotlight();
    requestAnimationFrame(animate);
}

animate();
