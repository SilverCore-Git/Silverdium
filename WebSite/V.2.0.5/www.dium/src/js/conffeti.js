function loadConfettiLibrary() {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
    script.onload = () => console.log("Canvas Confetti library loaded!");
    script.onerror = () => console.error("Failed to load the Canvas Confetti library.");
    document.head.appendChild(script);
}
loadConfettiLibrary();
const btn = document.getElementById('confetti-btn');
const confet = document.getElementById('coffeti');
let Confetti = false;

btn.addEventListener('click', () => {
    Confetti = true;
    console.log(`Confetti is now ${Confetti}`);
    confetti({
        particleCount: 150,
        spread: 80,
        origin: { x: 0.5, y: 0.8 },
    });
});

confet.addEventListener('click', () => {
    if (Confetti) {
        confetti({
            particleCount: 600,
            spread: 70,
            origin: { x: 0.5, y: 0.8 },
        });
    }
});