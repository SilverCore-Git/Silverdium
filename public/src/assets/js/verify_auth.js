/**
 * @author Silvercore 
 * @author Silverdium
 * @author MisterPapaye 
**/

import { verify, logout } from "/src/pages/auth/js/auth.js";

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

        document.getElementById('face_skin').src = `http://api.dium.silverdium.fr:54/index.php/api/skin-api/avatars/face/${client.response.name}`
        document.getElementById('auth_name').innerHTML = client.response.name + '<d class="arow">⮜</d>';
        document.getElementsByClassName('auth_profile')[0].style.display = 'flex';

        if (client.response.user_info.role.id === 2) {

            document.getElementById('auth_profile_admin').style.display = 'block';
            document.getElementById('auth_name').style.color = '#b90fc9';

        }

    }
}


check();
