const targetDate = new Date('January 1, 2025 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    this.gogogo = false

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownInterval);
        this.gogogo = true;
        document.querySelector('.newyearbtn').style.display = "block";
        document.querySelector('.countdown').innerHTML = '<h1><strong>Joyeuse année 2025 !!</strong></h1>';
    }
}

function gogo() {
    if (gogogo) {
        window.location.href = 'https://silverdium.fr/temp/newyearchees.html'
    } else {
        alert('Ce boutton sera accesible apres la nouvelle année !!');
    };
};

const countdownInterval = setInterval(updateCountdown, 1000);

