console.log("[tipeee.js]: Execution de tipeee.js...");
let pathtxt = '/silver/V1/src/data/tipeurs.txt';
fetch(pathtxt)
.then(response => response.text())
.then(data => {
    const texteFormate = data.replace(/\n/g, ' ');
    document.getElementById('tipeurs').innerHTML = texteFormate;
});
console.log("[tipeee.js]: Fin de l'execution de tipeee.js...");