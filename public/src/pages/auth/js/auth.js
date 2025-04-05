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



export  function verify(api_key) {

    return fetch(`${url}?az=verify&key=${api_key}`)
    .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => data)
      .catch(error => ({ error: true, message: error.message }));

}


export  function logout(api_key) {

    return fetch(`${url}?az=logout&key=${api_key}`)
    .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => data)
      .catch(error => ({ error: true, message: error.message }));

}


export async function update_skin(file, api_key) {

  const formData = new FormData();
  formData.append("skin", file);

  return fetch(`https://corsproxy.io/?url=https://silverdium.fr/api/user/update_skin?key=${api_key}`, {
    method: "POST",
    body: formData
  });

  const res = await response.json();

  return res

}