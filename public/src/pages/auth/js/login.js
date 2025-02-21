/**
 * @author SivlerCore
 * @author silverdium
 * @author MisterPapaye
 */


document.getElementById('conect').style.display = 'none';
document.getElementById('loader').style.display = 'flex';

import { login, verify } from '/src/pages/auth/js/auth.js';
import salert from '/src/assets/js/utils/salert.js';

const btn = document.getElementById('btn');
const mail = document.getElementById('mail');
const passwd = document.getElementById('passwd');

function open(page) {

    if (page === 'form') {

        document.getElementById('conect').style.display = 'flex';
        document.getElementById('loader').style.display = 'none';

    } 
    else if (page === 'loader') {
        document.getElementById('conect').style.display = 'none';
        document.getElementById('loader').style.display = 'flex';
    }
    else if (page === 'success') {
        document.getElementById('conect').style.display = 'none';
        document.getElementById('loader').style.display = 'none';
        salert('SilverAuth', `Connection reussie avec success !<br><i>mais qui est success ??</i><br>Tu va être rediriver d'ici peut...`, 'success');
    };

};

function validerEmail(email) {

    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    return regexEmail.test(email);

}
  
async function connect() {

    open('loader');

    try {

        const Login = await new login(mail.value, passwd.value); // Attendre la réponse de login()
        let client = Login.response;

        if (!client.error) {

            const Verify = await new verify(); // Attendre la vérification
            let client = Verify.response
            
            if (!client.user_info.banned) {
                open('success');
                setTimeout(function() { window.location.href = '/' }, 3000);
                
            } else {
                salert('SilverAuth', "Une erreur est survenue lors de la connection :<br>tu est banni des service Silver", 'error');
                open('form');
            }
        } else {
            salert('SilverAuth', `Une erreur est survenue lors de la connection :<br>${client.message}`, 'error');
            open('form');
        }

    } catch (err) {
        salert('Silverdium.fr', `Une erreur est survenue :<br>${err.message}`, 'error');
        open('form');
    }

}

open('form')

btn.addEventListener('click', async (event) => {

    event.preventDefault();

    if (passwd.value == '' || mail.value == '') { salert('Silverdium.fr', `Il faut remplir tout les champ<br>non pas ceux du fermier.`); }
    else if (!validerEmail(mail.value)) { salert('Silverdium.fr', `L'email n'est pas valide`); }
    else { connect() };

});