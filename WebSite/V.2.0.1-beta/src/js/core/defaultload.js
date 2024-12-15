console.log("[defaultload.js]: Execution de defaultload.js...");
import { loadBlock } from './loader-core.js';
console.log("[defaultload.js]: Chargement des default loadblock...");
export function defaultload() {
    console.log("[##.##]: Chargement des default loadblock...");
    loadBlock('', 'navbar');
    loadBlock('', 'head');
    loadBlock('', 'header');
    loadBlock('', 'endev');
    console.log("[##.##]: Fin du chargement des default loadblock");
}
console.log("[defaultload.js]: Fin de l'execution de defaultload.js...");