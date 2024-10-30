import { afficherAccueil } from './index.js';
import { afficherProduits } from './produits.js';
import { afficherPanier } from './panier.js';

export function chargerPage(page) {
    const content = document.getElementById('content');
    switch (page) {
        case 'accueil':
            content.innerHTML = '';
            afficherAccueil(content);
            break;
        case 'produits':
            content.innerHTML = '';
            afficherProduits(content);
            break;
        case 'panier':
            content.innerHTML = '';
            afficherPanier(content);
            break;
    }
}
window.chargerPage = chargerPage;
// Chargement initial de la page d'accueil après le DOM chargé
document.addEventListener('DOMContentLoaded', () => {
    chargerPage('accueil');
});

document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('nav').classList.toggle('active');
    document.querySelector('header').classList.toggle('active');
});