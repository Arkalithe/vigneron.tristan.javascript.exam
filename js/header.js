document.getElementById('menu-toggle').addEventListener('click', function() {
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');

    nav.classList.toggle('active');
    header.classList.toggle('active');

    if (nav.classList.contains('active')) {
        this.textContent = '×';
    } else {
        this.textContent = '☰';
    }
});
