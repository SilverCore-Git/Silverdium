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

    const client = await verify();

    if (client.error) {

        document.getElementsByClassName('auth_nav')[0].style.display = 'flex';

    }
    else {

        document.getElementById('face_skin').src = `https://auth.silverdium.fr/api/skin/view/head/${client.data.usr_info.name}`;
        document.getElementById('auth_name').innerHTML = client.data.usr_info.name + '<d class="arow">⮜</d>';
        document.getElementsByClassName('auth_profile')[0].style.display = 'flex';

        if (client.data.usr_info.account_grade === 'ADMIN') {

            document.getElementById('auth_profile_admin').style.display = 'block';
            document.getElementById('auth_name').style.color = '#b90fc9';

        }

    }
}

document.addEventListener('DOMContentLoaded', () => {
    check();
})