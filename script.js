function createBlood(x, y) {
    const particles = [];
    const particleCount = 100; // Augmenter le nombre de particules

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: x + player.size / 2,
            y: y + player.size / 2,
            dx: (Math.random() - 0.5) * 10, // Direction aléatoire
            dy: Math.random() * 5 + 2, // Tomber vers le bas
            size: Math.random() * 5 + 2, // Taille variable
            life: Math.random() * 30 + 30 // Durée de vie
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
