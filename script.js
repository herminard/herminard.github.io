// Assurez-vous de charger l'image avant d'essayer de la dessiner
const truckImage = new Image();
truckImage.src = 'images/2956028-camion-vehicule-vue-de-dessus-vecteur-conception-gratuit-vectoriel.jpg';

// Dessinez l'image du camion lorsque l'image est chargée
truckImage.onload = function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Redimensionner l'image à 80% de sa taille d'origine
    const scale = 0.2;
    const scaledWidth = truckImage.width * scale;
    const scaledHeight = truckImage.height * scale;

    // Exemple de dessin de l'image du camion au centre du canevas
    const truckX = canvas.width / 2 - scaledWidth / 2;
    const truckY = canvas.height / 2 - scaledHeight / 2;
    ctx.drawImage(truckImage, truckX, truckY, scaledWidth, scaledHeight);
};
