/**
 * @author Silvercore 
 * @author Silverdium
 * @author MisterPapaye 
**/

import { verify, logout } from "/src/pages/auth/js/auth.js";
import { skin2D } from "/src/assets/js/skin/skin2D.js";

const Logout = document.getElementById('logout')

Logout.addEventListener('click', () => {
    logout()
    location.reload();
})

async function check() {

    document.querySelector('.auth_nav').style.display = 'none';
    document.querySelector('.auth_profile').style.display = 'none';
    document.getElementById('auth_profile_admin').style.display = 'none';

    const client = await new verify();

    if (client.response.error) {

        document.getElementsByClassName('auth_nav')[0].style.display = 'flex';

    }
    else {

        let skin = await new skin2D().creatHeadTexture(client.skin.base64);

        const canvas = document.getElementById('face_skin');
        const ctx = canvas.getContext('2d');

        const img = new Image();
        
        img.onload = function() {

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height); 
        };

        img.src = skin;

        document.getElementById('auth_name').innerHTML = client.response.name + '<d class="arow">⮜</d>';
        document.getElementsByClassName('auth_profile')[0].style.display = 'flex';

        if (client.response.user_info.role.id === 2) {

            document.getElementById('auth_profile_admin').style.display = 'block';
            document.getElementById('auth_name').style.color = '#b90fc9';

        }

    }
}


check();
