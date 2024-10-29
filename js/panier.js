import { loadOrderForm } from './order.js';

export function afficherPanier(container) {
    container.innerHTML = `
        <section id="cart">
            <h2 class="title">Votre Panier</h2>
            <div id="cart-items"></div>
            <p id="cart-total"></p>
            <button id="checkout">Passer la commande</button>
        </section>
    `;
    chargerPanier();

    // Gestion de l'événement pour le bouton de commande
    document.getElementById('checkout').addEventListener('click', () => {
        const cartItems = JSON.parse(localStorage.getItem('panier')) || [];
        if (cartItems.length === 0) {
            alert("Votre panier est vide. Veuillez ajouter des produits avant de passer commande.");
        } else {
            loadOrderForm(container);
        }
    });
}

function chargerPanier() {
    const cartItems = JSON.parse(localStorage.getItem('panier')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let total = 0;

    cartItemsContainer.innerHTML = '';

    cartItems.forEach((item, index) => {
        const itemTotal = parseFloat(item.prix.replace('€', '').trim()) * item.quantite;
        total += itemTotal;
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.images[0]}" alt="${item.nom_produit}" class="secondary-image">
            </div>
            <div class="cart-item-content">
                <div class="cart-item-info">
                    <p>${item.nom_produit} - ${item.prix} x ${item.quantite} = ${itemTotal.toFixed(2)} €</p>
                </div>
                <div class="cart-item-controls">
                    <button onclick="changerQuantite(${index}, -1)">-</button>
                    <span>${item.quantite}</span>
                    <button onclick="changerQuantite(${index}, 1)">+</button>
                    <button onclick="supprimerDuPanier(${index})" class="delete-button">Supprimer</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    cartTotalElement.textContent = `Total : ${total.toFixed(2)} €`;
    localStorage.setItem('panier', JSON.stringify(cartItems));
}

// Fonction pour changer la quantité d'un produit dans le panier
window.changerQuantite = function(index, delta) {
    let cartItems = JSON.parse(localStorage.getItem('panier')) || [];
    cartItems[index].quantite += delta;
    // Supprime l'article si la quantité est réduite à zéro ou moins
        if (cartItems[index].quantite <= 0) {
        cartItems.splice(index, 1);
    }
    localStorage.setItem('panier', JSON.stringify(cartItems));
    chargerPanier();
}

// Fonction pour supprimer un produit du panier
window.supprimerDuPanier = function(index) {
    const cartItems = JSON.parse(localStorage.getItem('panier')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('panier', JSON.stringify(cartItems));
    chargerPanier();
}
