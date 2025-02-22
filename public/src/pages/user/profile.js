/**
 * @author SivlerCore
 * @author silverdium
 * @author MisterPapaye
 */

import { verify } from "/src/pages/auth/js/auth.js";
import salert from '/src/assets/js/utils/salert.js';

const block = document.getElementById('info');
const loader = document.getElementById('loader');

block.style.display = 'none';
loader.style.display = 'flex';

const name = document.getElementById('user_name');
const UUID = document.getElementById('user_UUID');
const mail = document.getElementById('user_email');
const role = document.getElementById('user_role_name');


const Verify = await new verify();
const client = Verify.response

if (client.error) {

    salert('SilverAuth', 'Une erreur est survene lors de la vérification du compte.', 'error');
    setTimeout(function() { window.location.href = '/' }, 3000);

} 
else {

    document.getElementById('user_image').src = `http://api.dium.silverdium.fr:54/index.php/api/skin-api/avatars/combo/${client.name}`
    name.innerText = client.name;
    UUID.innerText = `UUID : ${client.uuid}`;
    mail.style.display = 'none'
    mail.innerText = 'fonction en developpement';
    role.innerText = client.user_info.role.name;
    role.style.background = client.user_info.role.color;

    block.style.display = 'flex';
loader.style.display = 'none';

}