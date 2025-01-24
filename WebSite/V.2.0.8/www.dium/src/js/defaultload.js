console.log("[defaultload.js]: Execution de defaultload.js...");
import { loadBlock } from './core/loader-core.js';
console.log("[defaultload.js]: Chargement des default loadblock...");
function defaultload() {
    console.log("[##.##]: Chargement des default loadblock...");
    loadBlock('', 'navbar');
    loadBlock('', 'navbar2');
    loadBlock('', 'navbar3');
    loadBlock('', 'srvmcstatus');
    loadBlock('', 'newyeartime');
    console.log("[##.##]: Fin du chargement des default loadblock");
}
defaultload();
console.log("[defaultload.js]: Fin de l'execution de defaultload.js...");