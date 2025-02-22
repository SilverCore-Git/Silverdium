/**
 * @author SivlerCore
 * @author silverdium
 * @author MisterPapaye
 */

import { verify, update_skin } from "/src/pages/auth/js/auth.js";
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

    document.getElementById('user_skin').src = `http://api.dium.silverdium.fr:54/index.php/api/skin-api/skins/${client.name}`

    block.style.display = 'flex';
loader.style.display = 'none';

}


const btn = document.getElementById('skin_maj_btn')
const file = document.getElementById('file').files[0]


async function ahhhhhhh() {

    block.style.display = 'none';
    loader.style.display = 'flex';

    const res = await new update_skin(file)

    console.log(res)

    block.style.display = 'flex';
    loader.style.display = 'none';

}

btn.addEventListener("click", () => {

    ahhhhhhh();

})
