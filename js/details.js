import { fetchData } from './dataFetcher.js';

export async function afficherDetailProduit(container, produitId, navigateBack) {
    const data = await fetchData();
    if (!data) return;

    const produit = data.find(p => p.id === produitId);
    if (!produit) {
        container.innerHTML = "<p>Produit non trouvé</p>";
        return;
    }

    container.innerHTML = `
        <section id="product-details">
            <button id="back-button" class="back-button">← Retour</button>
            <h2>${produit.nom_produit}</h2>
            <div class="product-gallery">
                <div class="main-image-container">
                    <img src="${produit.images[0]}" alt="${produit.nom_produit}" id="main-image">
                </div>
            </div>
            <p><strong>Description:</strong> ${produit.descriptif}</p>
            <p><strong>Prix:</strong> ${produit.prix}</p>
            <h3>Caractéristiques Techniques</h3>
            <ul>
                <li><strong>Résolution:</strong> ${produit.caracteristiques.résolution}</li>
                <li><strong>Zoom:</strong> ${produit.caracteristiques.zoom}</li>
                <li><strong>Connectivité:</strong> ${produit.caracteristiques.connectivité}</li>
                <li><strong>Écran:</strong> ${produit.caracteristiques.écran}</li>
            </ul>
        
            <button id="add-to-cart">Ajouter au panier</button>
        </section>
    `;

    document.getElementById('add-to-cart').addEventListener('click', () => ajouterAuPanier(produit));
    document.getElementById('main-image').addEventListener('click', () => afficherImagePleinEcran(produit.images));
    document.getElementById('back-button').addEventListener('click', navigateBack);
}

function afficherImagePleinEcran(images) {
    let currentIndex = 0;

    const fullscreenContainer = document.createElement('div');
    fullscreenContainer.classList.add('fullscreen-container');
    fullscreenContainer.innerHTML = `
        <div class="fullscreen-content">
            <button class="nav-button prev-button">⬅️</button>
            <img src="${images[currentIndex]}" alt="Produit en plein écran" id="fullscreen-image">
            <button class="nav-button next-button">➡️</button>
            <button class="close-button">&times;</button>
        </div>
    `;
    document.body.appendChild(fullscreenContainer);

    const updateImage = () => {
        const fullscreenImage = document.getElementById('fullscreen-image');
        fullscreenImage.src = images[currentIndex];
    };

    fullscreenContainer.querySelector('.prev-button').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    });

    fullscreenContainer.querySelector('.next-button').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    });

    fullscreenContainer.querySelector('.close-button').addEventListener('click', () => {
        document.body.removeChild(fullscreenContainer);
    });

    fullscreenContainer.addEventListener('click', (e) => {
        if (e.target === fullscreenContainer) {
            document.body.removeChild(fullscreenContainer);
        }
    });
}

function ajouterAuPanier(produit) {
    let cartItems = JSON.parse(localStorage.getItem('panier')) || [];
    const existingProductIndex = cartItems.findIndex(item => item.id === produit.id);

    if (existingProductIndex !== -1) {
        cartItems[existingProductIndex].quantite += 1;
    } else {
        cartItems.push({ ...produit, quantite: 1 });
    }

    localStorage.setItem('panier', JSON.stringify(cartItems));

    const confirmMessage = document.createElement('div');
    confirmMessage.textContent = 'Produit ajouté au panier !';
    confirmMessage.style.position = 'fixed';
    confirmMessage.style.top = '20px';
    confirmMessage.style.left = '50%';
    confirmMessage.style.transform = 'translateX(-50%)';
    confirmMessage.style.backgroundColor = '#4CAF50';
    confirmMessage.style.color = 'white';
    confirmMessage.style.padding = '10px 20px';
    confirmMessage.style.borderRadius = '5px';
    confirmMessage.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.2)';
    confirmMessage.style.transition = 'opacity 0.3s ease';
    confirmMessage.style.zIndex = '10000';

    document.body.appendChild(confirmMessage);

    setTimeout(() => {
        confirmMessage.style.opacity = '0';
        setTimeout(() => confirmMessage.remove(), 300);
    }, 1500);
}
