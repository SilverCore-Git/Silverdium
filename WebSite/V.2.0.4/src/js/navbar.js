// defaultload.js ou un nouveau fichier JS
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");

    // Toggle de la classe active pour afficher/masquer le menu
    menuToggle.addEventListener("click", () => {
        const expanded = menuToggle.getAttribute("aria-expanded") === "true" || false;
        menuToggle.setAttribute("aria-expanded", !expanded);
        navbar.classList.toggle("active");
    });    

    // Optionnel : Fermer le menu lorsqu'on clique en dehors
    document.addEventListener("click", (event) => {
        if (!navbar.contains(event.target) && !menuToggle.contains(event.target)) {
            navbar.classList.remove("active");
        }
    });
});
