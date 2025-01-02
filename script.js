// Assurez-vous de charger l'image avant d'essayer de la dessiner
const truckImage = new Image();
truckImage.src = 'images/2956028-camion-vehicule-vue-de-dessus-vecteur-conception-gratuit-vectoriel.jpg';

// Dessinez l'image du camion lorsque l'image est chargée
truckImage.onload = function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Exemple de dessin de l'image du camion au centre du canevas
    const truckX = canvas.width / 2 - truckImage.width / 2;
    const truckY = canvas.height / 2 - truckImage.height / 2;
    ctx.drawImage(truckImage, truckX, truckY);
};
