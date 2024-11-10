var filesurname = 'servmc';
var filename = filesurname + '.js';
console.log('[',filename,']: Execution de ',filename,'...');

console.log('[',filename,']: importation de function loader core...');
import { loadercore, loadBlock } from './core/loader-core.js';
import { defaultload } from './core/defaultload.js';

function loadcore() {
    loadercore();
    defaultload();
} 

function loadingindexcontent() {
    loadBlock(filesurname, 'mainsc');
    loadBlock(filesurname, 'infosmc');
    loadBlock(filesurname, 'pourjouer');
}

console.log('[',filename,']: Execution des fonction...');
loadcore();
loadingindexcontent();
console.log('[',filename,"]: Fin de l'execution de ",filename,);