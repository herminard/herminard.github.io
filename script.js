const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let player = { x: 50, y: 50, width: 30, height: 30, dx: 0, dy: 0, speed: 2 };
let obstacles = [];
let score = 0;

// Create obstacles
for (let i = 0; i < 5; i++) {
    obstacles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, width: 30, height: 30 });
}

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
    ctx.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function update() {
    player.x += player.dx;
    player.y += player.dy;

    // Check for collisions
    obstacles.forEach(obstacle => {
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            score += 1;
            obstacle.x = Math.random() * canvas.width;
            obstacle.y = Math.random() * canvas.height;
        }
    });

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw everything
    drawPlayer();
    drawObstacles();

    // Animation loop
    requestAnimationFrame(update);
}

function movePlayer(e) {
    switch (e.key) {
        case 'ArrowUp':
            player.dy = -player.speed;
            break;
        case 'ArrowDown':
            player.dy = player.speed;
            break;
        case 'ArrowLeft':
            player.dx = -player.speed;
            break;
        case 'ArrowRight':
            player.dx = player.speed;
            break;
    }
}

function stopPlayer(e) {
    switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
            player.dy = 0;
            break;
        case 'ArrowLeft':
        case 'ArrowRight':
            player.dx = 0;
            break;
    }
}

document.getElementById('speedUp').addEventListener('click', () => {
    player.speed += 1;
});

document.getElementById('speedDown').addEventListener('click', () => {
    if (player.speed > 1) {
        player.speed -= 1;
    }
});

document.getElementById('moveLeft').addEventListener('mousedown', () => {
    player.dx = -player.speed;
});

document.getElementById('moveRight').addEventListener('mousedown', () => {
    player.dx = player.speed;
});

document.getElementById('moveLeft').addEventListener('mouseup', () => {
    player.dx = 0;
});

document.getElementById('moveRight').addEventListener('mouseup', () => {
    player.dx = 0;
});

document.addEventListener('keydown', movePlayer);
document.addEventListener('keyup', stopPlayer);

update();
