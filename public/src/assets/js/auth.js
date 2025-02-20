/**
 * @author SivlerCore
 * @author silverdium
 * @author MisterPapaye
 */

const url = "/api/auth";
const api_key = "ce4693ea4cb18818f107a20cf89f26ab";

export  function login(mail, passwd) {

    fetch(`${url}?az=login&mail=${mail}&passwd=${passwd}&key=${api_key}`, {
        method: "POST",
    })
    .then(response => {
        return response
    })
    .catch(err => {
        return err
    })

}


export  function verify() {

    fetch(`${url}?az=verify&key=${api_key}`, {
        method: "POST",
    })
    .then(response => {
        return response
    })
    .catch(err => {
        return err
    })

}


export  function logout() {

    fetch(`${url}?az=logout&key=${api_key}`, {
        method: "POST",
    })
    .then(response => {
        return response
    })
    .catch(err => {
        return err
    })

}
