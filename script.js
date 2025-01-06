const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const messageElement = document.getElementById('message');
const trophyElement = document.getElementById('trophy');

const player = { x: 10, y: 10, size: 20 };
const truck = { x: 260, y: 440, width: 60, height: 40, color: 'red' };
const obstacles = [
    { x: 100, y: 200, size: 20, color: 'gray', direction: 1 },
    { x: 150, y: 300, size: 20, color: 'green', direction: -1 },
    { x: 50, y: 100, size: 20, color: 'yellow', direction: 1 },
    { x: 180, y: 80, size: 20, color: 'orange', direction: -1 },
];
const gameState = { score: 0, won: false, collision: false };

let moveInterval = null;

function drawPlayer() {
    // Draw body
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Draw head
    ctx.beginPath();
    const headX = player.x + player.size / 2;
    const headY = player.y - 10 + (player.dy > 0 ? 5 : player.dy < 0 ? -5 : 0); // Adjust head position based on movement
    ctx.arc(headX, headY, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'peachpuff';
    ctx.fill();

    // Draw eyes
    ctx.beginPath();
    ctx.arc(headX - 5, headY - 5, 2, 0, Math.PI * 2); // Left eye
    ctx.arc(headX + 5, headY - 5, 2, 0, Math.PI * 2); // Right eye
    ctx.fillStyle = 'black';
    ctx.fill();

    // Draw mouth (expression)
    ctx.beginPath();
    // Example: neutral expression
    ctx.arc(headX, headY + 2, 5, 0, Math.PI, false); // Smile
    ctx.strokeStyle = 'black';
    ctx.stroke();

    // Draw arms pushing the box
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x - 5, player.y + 5, 5, 10); // Left arm
    ctx.fillRect(player.x + player.size, player.y + 5, 5, 10); // Right arm

    // Draw the box
    ctx.fillStyle = 'green';
    ctx.fillRect(player.x + player.size, player.y, player.size, player.size);

    // Draw tools
    drawTool(player.x + player.size + 5, player.y + 5, 'hammer'); // Example tool
}

function drawTool(x, y, tool) {
    switch (tool) {
        case 'hammer':
            drawHammer(x, y);
            break;
        case 'wrench':
            drawWrench(x, y);
            break;
        case 'ladder':
            drawLadder(x, y);
            break;
        // Add more tools as needed
    }
}

function drawHammer(x, y) {
    ctx.fillStyle = 'gray';
    ctx.fillRect(x, y, 10, 5); // Hammer head
    ctx.fillStyle = 'brown';
    ctx.fillRect(x + 3, y + 5, 4, 10); // Hammer handle
}

function drawWrench(x, y) {
    ctx.fillStyle = 'gray';
    ctx.fillRect(x, y, 2, 15); // Wrench handle
    ctx.beginPath();
    ctx.arc(x + 1, y, 5, 0, Math.PI * 2); // Wrench head
    ctx.fill();
}

function drawLadder(x, y) {
    ctx.fillStyle = 'brown';
    ctx.fillRect(x, y, 5, 20); // Ladder side
    ctx.fillRect(x + 10, y, 5, 20); // Ladder side
    ctx.fillStyle = 'gray';
    for (let i = 0; i < 5; i++) {
        ctx.fillRect(x, y + i * 5, 15, 2); // Ladder rungs
    }
}

function drawTruck() {
    ctx.fillStyle = truck.color;
    ctx.fillRect(truck.x, truck.y, truck.width, truck.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(truck.x + 10, truck.y - 10, truck.width - 20, 10);
    ctx.fillStyle = 'white';
    ctx.fillRect(truck.x + 15, truck.y + 10, truck.width - 30, 10);
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.size, obstacle.size);
        ctx.beginPath();
        ctx.arc(obstacle.x + obstacle.size / 2, obstacle.y - 10, 10, 0, Math.PI * 2);
        ctx.fill();
    });
}

function moveObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.x += obstacle.direction * 2;
        if (obstacle.x < 0 || obstacle.x + obstacle.size > canvas.width) {
            obstacle.direction *= -1;
        }
    });
}

function createBlood(x, y) {
    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: x + player.size / 2,
            y: y + player.size / 2,
            dx: (Math.random() - 0.5) * 10,
            dy: Math.random() * 5 + 2,
            size: Math.random() * 5 + 2,
            life: Math.random() * 30 + 30
        });
    }

    function drawParticles() {
        particles.forEach((particle, index) => {
            if (particle.life > 0) {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = 'red';
                ctx.fill();
                particle.x += particle.dx;
                particle.y += particle.dy;
                particle.life--;
            } else {
                particles.splice(index, 1);
            }
        });
    }

    function animateBlood() {
        if (particles.length > 0) {
            drawParticles();
            requestAnimationFrame(animateBlood);
        }
    }

    animateBlood();
}

function detectCollision() {
    for (const obstacle of obstacles) {
        if (
            player.x < obstacle.x + obstacle.size &&
            player.x + player.size > obstacle.x &&
            player.y < obstacle.y + obstacle.size &&
            player.y + player.size > obstacle.y
        ) {
            gameState.collision = true;
            createBlood(obstacle.x, obstacle.y);
            return true;
        }
    }
    return false;
}

function detectHumanTruckCollision() {
    for (const obstacle of obstacles) {
        if (
            truck.x < obstacle.x + obstacle.size &&
            truck.x + truck.width > obstacle.x &&
            truck.y < obstacle.y + obstacle.size &&
            truck.y + truck.height > obstacle.y
        ) {
            gameState.collision = true;
            createBlood(obstacle.x, obstacle.y);
            return true;
        }
    }
    return false;
}

function detectWin() {
    if (
        player.x < truck.x + truck.width &&
        player.x + player.size > truck.x &&
        player.y < truck.y + truck.height &&
        player.y + player.size > truck.y
    ) {
        gameState.score += 100;
        scoreElement.textContent = `Score: ${gameState.score}`;
        resetPlayer();

        if (gameState.score >= 500) {
            messageElement.textContent = 'YOU ARE HIRED!';
            messageElement.style.color = 'green';
            trophyElement.style.display = 'block';
            gameState.won = true;
        }
    }
}

function resetPlayer() {
    player.x = 10;
    player.y = 10;
    gameState.collision = false;
    messageElement.textContent = '';
    trophyElement.style.display = 'none';
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawTruck();
    drawObstacles();

    if (gameState.collision) {
        messageElement.textContent = 'TASK FAILED!';
        messageElement.style.color = 'red';
        setTimeout(() => {
            resetPlayer();
        }, 1000);
    } else {
        detectWin();
    }
}

function movePlayer(dx, dy) {
    if (!gameState.won) {
        player.x += dx;
        player.y += dy;
        player.dx = dx; // Store the horizontal movement direction
        player.dy = dy; // Store the vertical movement direction

        if (detectCollision() || detectHumanTruckCollision()) {
            updateGame();
            return;
        }
        updateGame();
    }
}

function startMoving(dx, dy) {
    if (moveInterval === null) {
        moveInterval = setInterval(() => movePlayer(dx, dy), 100);
    }
}

function stopMoving() {
    clearInterval(moveInterval);
    moveInterval = null;
}

const controls = document.querySelectorAll('.button');
controls.forEach(button => {
    button.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const buttonId = e.target.id;
        if (buttonId === 'left') startMoving(-20, 0);
        if (buttonId === 'right') startMoving(20, 0);
        if (buttonId === 'up') startMoving(0, -20);
        if (buttonId === 'down') startMoving(0, 20);
    });

    button.addEventListener('touchend', (e) => {
        e.preventDefault();
        stopMoving();
    });
});

function gameLoop() {
    moveObstacles();
    updateGame();
    requestAnimationFrame(gameLoop);
}

gameLoop();
