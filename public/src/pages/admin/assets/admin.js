

import { verify } from "/src/pages/auth/js/auth.js";
import salert from "/src/assets/js/utils/salert.js"
import { Verify } from "/admin/verify";

// get element
const popup = document.getElementById('popup');
const loader = document.getElementById('loader');

// display non element
if (popup && loader) {
    popup.style.display = 'none';
    loader.style.display = 'none';
}


// for open a page
async function openPage(page) {

    if (page === 'loader') {

        loader.style.display = 'flex';

    } else {

        try {

            const response = await fetch(`/admin/panel/${page}`);
            if (!response.ok) throw new Error('Erreur de chargement');
            const html = await response.text();
            popup.innerHTML = html;
            popup.style.display = 'block'; 

        } catch (error) {

            console.error('Erreur lors du chargement de la page :', error);

        }

    }
}

// config a page
function configPage(page) {

    if (page === 'main') {

        const nb_user_total = document.getElementById('nb_user_total')
        const nb_user_online = document.getElementById('nb_user_online')



    }

}

// close a page
function closePage(page) {

    if (page === 'loader') {

        loader.style.display = 'none';

    } else {

        const popup = document.getElementById(page);
        if (popup) popup.style.display = 'none';

    }
}

// progs
(async () => {

    openPage('loader');


    if (await Verify() == true) {

        await openPage('main');
        configPage()
        
        closePage('loader');
    
    } else { salert('SilverAuth', 'Le rôle n\'est pas autorisé pour cet utilisateur.', 'error'); setTimeout(function() { window.location.href = '/' }, 2000) }

})();


