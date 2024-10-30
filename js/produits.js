    import { fetchData } from './dataFetcher.js';
    import { appliquerFiltres, initialiserEcouteFiltres } from './filtres.js';
    import { afficherDetailProduit } from './details.js';

    export async function afficherProduits(container) {

        container.innerHTML = `
            <section id="products">
                <h2 class="title">Liste des Produits</h2>
                <div class="filters">
                    <input type="text" id="search" placeholder="Rechercher un produit...">
                    <select id="filter-marque">
                        <option value="">Filtrer par marque</option>
                    </select>
                    <select id="filter-prix">
                        <option value="">Filtrer par prix</option>
                        <option value="low">Moins de 500 €</option>
                        <option value="medium">500 € - 1000 €</option>
                        <option value="high">Plus de 1000 €</option>
                    </select>
                </div>
                <div id="product-list"></div>
            </section>
        `;

        const data = await fetchData();// Récupération des données de produit
        if (data) {
            afficherListeProduits(data);// Affiche la liste complète des produits
            initialiserFiltres(data);// Initialise les options de filtre pour la marque
            initialiserEcouteFiltres(data, afficherListeProduits);// Ajoute des écouteurs pour les filtres
        }
    }

    function initialiserFiltres(data) {
        const marques = [...new Set(data.map(produit =>
            produit.nom_produit.split(' ')[0]))];

        const filterMarque = document.getElementById('filter-marque');
        marques.forEach(marque => {
            const option = document.createElement('option');
            option.value = marque;
            option.textContent = marque;
            filterMarque.appendChild(option);
        });
    }

    export function afficherListeProduits(data) {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
        data.forEach(produit => {
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
                    afficherProduits(container);
                    window.location.hash = '#produits';
                });
            });
            productList.appendChild(card);
        });
    }
