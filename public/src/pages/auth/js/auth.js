/**
 * @author SivlerCore
 * @author silverdium
 * @author MisterPapaye
 */

const url = "/api/auth";
const api_key = "ce4693ea4cb18818f107a20cf89f26ab";

export function login(mail, passwd) {
    return fetch(`/api/auth?az=login&mail=${mail}&passwd=${passwd}&key=${api_key}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => ({ error: true, message: error.message }));
  
}



export  function verify() {

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


export  function logout() {

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


export async function update_skin(file) {

  const formData = new FormData();
  formData.append("skin", file);

  return fetch(`/api/user/update_skin?key=${api_key}`, {
    method: "POST",
    body: formData
  });

  const res = await response.json();

  return res

}