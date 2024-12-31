
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const truck = { x: canvas.width - 210, y: canvas.height - 110, width: 200, height: 100 };

let player = { x: 50, y: 50, width: 30, height: 30, dx: 0, dy: 0, speed: 2 };
let obstacles = [];
let score = 0;

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

function drawTruck() {
    ctx.fillStyle = 'black';
    ctx.fillRect(truck.x, truck.y, truck.width, truck.height);
}

function update() {
    player.x += player.dx;
    player.y += player.dy;

    // Check if player is in the truck
    if (player.x + player.width > truck.x && player.x < truck.x + truck.width &&
        player.y + player.height > truck.y && player.y < truck.y + truck.height) {
        player.x = 50;
        player.y = 50;
        score += 100;
        document.getElementById('score').textContent = "Score: " + score;
        if (score >= 1000) {
            displayFireworks();
        }
    }

    obstacles.forEach(obstacle => {
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            player.x = 50;
            player.y = 50;
            obstacle.x = Math.random() * canvas.width;
            obstacle.y = Math.random() * canvas.height;
        }
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawTruck();
    drawPlayer();
    drawObstacles();

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

document.getElementById('speedUp').addEventListener('click', (e) => {
    e.preventDefault();
    player.speed += 1;
});

document.getElementById('speedDown').addEventListener('click', (e) => {
    e.preventDefault();
    if (player.speed > 1) {
        player.speed -= 1;
    }
});

document.getElementById('moveLeft').addEventListener('mousedown', (e) => {
    e.preventDefault();
    player.dx = -player.speed;
});

document.getElementById('moveRight').addEventListener('mousedown', (e) => {
    e.preventDefault();
    player.dx = player.speed;
});

document.getElementById('moveUp').addEventListener('mousedown', (e) => {
    e.preventDefault();
    player.dy = -player.speed;
});

document.getElementById('moveDown').addEventListener('mousedown', (e) => {
    e.preventDefault();
    player.dy = player.speed;
});

document.getElementById('moveLeft').addEventListener('mouseup', (e) => {
    e.preventDefault();
    player.dx = 0;
});

document.getElementById('moveRight').addEventListener('mouseup', (e) => {
    e.preventDefault();
    player.dx = 0;
});

document.getElementById('moveUp').addEventListener('mouseup', (e) => {
    e.preventDefault();
    player.dy = 0;
});

document.getElementById('moveDown').addEventListener('mouseup', (e) => {
    e.preventDefault();
    player.dy = 0;
});

document.addEventListener('keydown', movePlayer);
document.addEventListener('keyup', stopPlayer);

function displayFireworks() {
    const fireworks = document.createElement('div');
    fireworks.classList.add('fireworks');
    fireworks.innerHTML = '<img src="fireworks.gif" alt="Fireworks">';
    document.body.appendChild(fireworks);
    fireworks.style.display = 'block';

    setTimeout(() => {
        fireworks.style.display = 'none';
        document.body.removeChild(fireworks);
        if (confirm('You won! Play again?')) {
            score = 0;
            document.getElementById('score').textContent = "Score: " + score;
            player.x = 50;
            player.y = 50;
            obstacles.forEach(obstacle => {
                obstacle.x = Math.random() * canvas.width;
                obstacle.y = Math.random() * canvas.height;
            });
        }
    }, 5000);
}

update();
