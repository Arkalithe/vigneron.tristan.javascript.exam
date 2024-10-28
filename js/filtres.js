export function appliquerFiltres(data, afficherListeProduits) {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const marqueFiltre = document.getElementById('filter-marque').value;
    const prixFiltre = document.getElementById('filter-prix').value;
    let produitsFiltres = data;


    if (searchQuery) {
        produitsFiltres = produitsFiltres.filter(produit =>
            produit.nom_produit.toLowerCase().includes(searchQuery)
        );
    }

    if (marqueFiltre) {
        produitsFiltres = produitsFiltres.filter(produit =>
            produit.nom_produit.startsWith(marqueFiltre)
        );
    }
    if (prixFiltre) {
        produitsFiltres = produitsFiltres.filter(produit => {
            const prix = parseFloat(produit.prix.replace('€', '').trim());
            if (prixFiltre === 'low') return prix < 500;
            if (prixFiltre === 'medium') return prix >= 500 && prix <= 1000;
            if (prixFiltre === 'high') return prix > 1000;
        });
    }


    afficherListeProduits(produitsFiltres);
}

export function initialiserEcouteFiltres(data, afficherListeProduits) {
    document.getElementById('search').addEventListener('input', () => appliquerFiltres(data, afficherListeProduits));
    document.getElementById('filter-marque').addEventListener('change', () => appliquerFiltres(data, afficherListeProduits));
    document.getElementById('filter-prix').addEventListener('change', () => appliquerFiltres(data, afficherListeProduits));
}