/**
 * @author Silvercore 
 * @author Silverdium
 * @author MisterPapaye 
**/


import { verify } from "/src/pages/auth/js/auth.js";
import salert from "/src/assets/js/utils/salert.js"

export async function Verify() {

    const response = await fetch('/api/config?key=ce4693ea4cb18818f107a20cf89f26ab');
    const get_config = await response.json();
    const client = await new verify();



    if (!client.response.error) {

        if (get_config.admin && get_config.admin.role_id && get_config.admin.role_id.includes(client.response.user_info.role.id)) {

            return true; salert('SilverAuth', `Connecté en tant que : ${client.response.name}
                <br>avec le rôle : ${client.response.user_info.role.name}`, 'success');


        } else {
            return false; salert('SilverAuth', 'Le rôle n\'est pas autorisé pour cet utilisateur.', 'error'); setTimeout(function() { window.location.href = '/' }, 2000);

        }

    }


    else {
        return false; salert('SilverAuth', `Erreur lors de la connection :<br>${client.response.message}`, 'error'); setTimeout(function() { window.location.href = '/' }, 2000);
    }

}