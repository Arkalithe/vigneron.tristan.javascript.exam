export function loadOrderForm(container) {

    displayOrderForm(container);
}

function displayOrderForm(container) {
    container.innerHTML = `
        <section id="order-form">
            <h2>Valider la Commande</h2>
            <form id="checkout-form">
                <label for="first-name">Prénom</label>
                <input type="text" id="first-name" name="first-name" required>

                <label for="last-name">Nom</label>
                <input type="text" id="last-name" name="last-name" required>

                <label for="street-number">Numéro de rue</label>
                <input type="text" id="street-number" name="street-number" required pattern="^[0-9]+$">

                <label for="street-name">Nom de la rue</label>
                <input type="text" id="street-name" name="street-name" required>

                <label for="additional-info">Complément d'information</label>
                <input type="text" id="additional-info" name="additional-info">

                <label for="postal-code">Code Postal</label>
                <input type="text" id="postal-code" name="postal-code" required pattern="^[0-9]{5}$">

                <label for="city">Ville</label>
                <input type="text" id="city" name="city" required>

                <label for="contact">Numéro de Téléphone</label>
                <input type="tel" id="contact" name="contact" required pattern="^[0-9]{10}$" placeholder="ex: 0601020304">

                <button type="submit">Confirmer la Commande</button>
            </form>
            <div id="order-summary" style="display: none;"></div>
        </section>
    `;

    document.getElementById('checkout-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const streetNumber = document.getElementById('street-number').value.trim();
        const streetName = document.getElementById('street-name').value.trim();
        const postalCode = document.getElementById('postal-code').value.trim();
        const city = document.getElementById('city').value.trim();
        const contact = document.getElementById('contact').value.trim();

        if (!firstName || !lastName || !streetNumber || !streetName || !postalCode || !city || !contact) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return;
        }
        if (!/^[0-9]{5}$/.test(postalCode)) {
            alert("Veuillez entrer un code postal valide (5 chiffres).");
            return;
        }
        if (!/^[0-9]{10}$/.test(contact)) {
            alert("Veuillez entrer un numéro de téléphone valide (10 chiffres).");
            return;
        }

        const additionalInfo = document.getElementById('additional-info').value.trim() || 'N/A';

        const orderNumber = 'CMD-' + Math.floor(Math.random() * 1000000);
        const summary = document.getElementById('order-summary');
        summary.innerHTML = `
            <h3>Récapitulatif de la Commande</h3>
            <p><strong>Numéro de commande:</strong> ${orderNumber}</p>
            <p><strong>Nom:</strong> ${firstName} ${lastName}</p>
            <p><strong>Adresse de Livraison:</strong><br>
                ${streetNumber} ${streetName}, ${additionalInfo}<br>
                ${postalCode} ${city}
            </p>
            <p><strong>Téléphone:</strong> ${contact}</p>
            <p>Merci pour votre commande !</p>
        `;
        summary.style.display = 'block';
    });
}
