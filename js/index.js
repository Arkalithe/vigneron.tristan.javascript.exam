
import { fetchData } from './dataFetcher.js';
import { afficherDetailProduit } from './details.js';

export async function afficherAccueil(container) {
    container.innerHTML = `
        <section id="home">
            <h1 class="title">Bienvenue sur Instant Photo, notre site de vente d'appareils photo</h1>
            <div id="featured-products"></div>
        </section>
    `;

    const data = await fetchData();

    if (data) {
        afficherProduitsVedettes(data);
    }
}

function afficherProduitsVedettes(data) {
    const featuredContainer = document.getElementById('featured-products');

    // Vérification que le conteneur pour les produits vedettes existe
    if (!featuredContainer) {
        console.error('Container pour les produits vedettes non trouvé');
        return;
    }

    const featuredIds = [1, 3, 7, 12, 11];
    const vedettes = data.filter(produit => featuredIds.includes(produit.id));
    console.log(vedettes);

    // Ajout d'un événement pour afficher les détails d'un produit
    vedettes.forEach(produit => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${produit.images[0]}" alt="${produit.nom_produit}">
            <h3>${produit.nom_produit}</h3>
            <p>${produit.descriptif}</p>
            <p><strong>${produit.prix}</strong></p>
            <button class="details-button">Voir les Détails</button>
        `;

        card.querySelector('.details-button').addEventListener('click', () => {
            const container = document.getElementById('content');
            afficherDetailProduit(container, produit.id, () => {
                container.innerHTML = '';
                afficherAccueil(container);
                window.location.hash = '#home';
            });
        });

        featuredContainer.appendChild(card);
    });
}