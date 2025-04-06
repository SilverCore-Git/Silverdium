/**
 * @author SivlerCore
 * @author silverdium
 * @author MisterPapaye
 */

const url = "/api/auth";

export function login(mail, passwd, api_key) {
    return fetch(`${url}?az=login&mail=${mail}&passwd=${passwd}&key=${api_key}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => ({ error: true, message: error.message }));
  
}



export async function verify() {

  const token = getCookie('silvertoken');

  return await fetch(`http://localhost:8456/auth/verify`, {
    headers: {
      'silvertoken': token
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => data)
  .catch(error => ({ error: true, message: error.message }));
    

}


export function logout() {

    document.cookie = "silvertoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    return fetch(`https://auth.silverdium.fr/auth/logout`)

}


export async function update_skin(file, api_key) {

  const formData = new FormData();
  formData.append("skin", file);

  return fetch(`https://silverdium.fr/api/user/update_skin?key=${api_key}`, {
    method: "POST",
    body: formData
  });

  const res = await response.json();

  return res

}



function getCookie(name) {
  const cookieArr = document.cookie.split(';'); // Divise la chaîne de cookies en un tableau
  // Parcours chaque cookie pour trouver celui qui correspond au nom
  for (let i = 0; i < cookieArr.length; i++) {
    let cookie = cookieArr[i].trim();  // Supprime les espaces en début et fin
    if (cookie.startsWith(name + '=')) {
      // Si on trouve le cookie, on retourne sa valeur
      return cookie.substring(name.length + 1); // Retourne la valeur du cookie
    }
  }
  return null;  // Retourne null si le cookie n'existe pas
}