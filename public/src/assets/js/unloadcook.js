/**
 * @author SivlerCore
 * @author silverdium
 * @author MisterPapaye
 */

window.addEventListener('beforeunload', () => {

    document.cookie = "big_token=; Max-Age=0; path=/; secure; HttpOnly; SameSite=Strict";

});
