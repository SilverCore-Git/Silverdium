          ///////////////////////
         //    LOADER CORE    //
        ///////////////////////
console.log("[loader-core.js]: Execution de loader-core.js...");

console.log("[loader-core.js]: Exportation des fonction leadercore et loadblock...");
export function loadercore() {
    const errmsg = 'Erreur de chargement du block';
    console.log('[##.##]: Chargement de loadercore');
}
export function loadBlock(page, blockname, errmsg) {
    console.log('[##.##]: Chargement de loadblock');
    fetch(`/src/htmlblock/${page}/${blockname}.html`) 
        .then(response => response.text())
        .then(data => {
            document.getElementById(blockname).innerHTML = data;
        })
        .catch(error => console.error(errmsg, blockname, error))
}
console.log("[loader-core.js]: Exportation des fonction leadercore et loadblock terminer");
console.log("[loader-core.js]: Fin de l'execution de loader-core.js");
