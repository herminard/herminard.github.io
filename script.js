const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game Variables
const gridSize = 20;
const player = { x: 0, y: 0, width: gridSize, height: gridSize };
const truck = { x: canvas.width - gridSize * 3, y: canvas.height - gridSize * 2, width: gridSize * 3, height: gridSize * 2 };
let score = 0;

// Draw Game Elements
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Truck
    ctx.fillStyle = 'red';
    ctx.fillRect(truck.x, truck.y, truck.width, truck.height);

    // Draw Player
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw Score
    ctx.fillStyle = 'white';
    ctx.font = '20px Courier New';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

// Check Collision
function checkCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

// Reset Player Position
function resetPlayer() {
    player.x = 0;
    player.y = 0;
}

// Update Game State
function update() {
    if (checkCollision(player, truck)) {
        score += 100;
        resetPlayer();
        document.getElementById('score').textContent = `Score: ${score}`;
    }

    draw();
}

// Input Handling
const keys = {};
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function gameLoop() {
    if (keys['ArrowUp'] || keys['w']) player.y -= gridSize;
    if (keys['ArrowDown'] || keys['s']) player.y += gridSize;
    if (keys['ArrowLeft'] || keys['a']) player.x -= gridSize;
    if (keys['ArrowRight'] || keys['d']) player.x += gridSize;

    update();
    setTimeout(gameLoop, 200);
}

// Start the Game
draw();
gameLoop();
