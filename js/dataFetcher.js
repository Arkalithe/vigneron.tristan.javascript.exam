export async function fetchData() {
        try {
        const response = await fetch('./produits.json');
                if (!response.ok) {
            throw new Error("Erreur lors du chargement des produits");
        }

        return await response.json();

    } catch (error) {
        console.error("Erreur: ", error);
        return null;

    }
}