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
