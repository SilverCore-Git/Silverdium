/**
 * @author SivlerCore
 * @author silverdium
 * @author MisterPapaye
 */

const url = "/auth/az";
const api_key = "ce4693ea4cb18818f107a20cf89f26ab";


function register(name, mail, passwd) {

    fetch(`${url}?bg=register&name=${name}&mail=${mail}&passwd=${passwd}&key=${api_key}`, {
        method: "POST",
    })
    .then(response => {
        return response
    })
    .catch(err => {
        return err
    })

}


function login(mail, passwd) {

    fetch(`${url}?bg=login&mail=${mail}&passwd=${passwd}&key=${api_key}`, {
        method: "POST",
    })
    .then(response => {
        return response
    })
    .catch(err => {
        return err
    })

}


function verify() {

    fetch(`${url}?bg=verify&key=${api_key}`, {
        method: "POST",
    })
    .then(response => {
        return response
    })
    .catch(err => {
        return err
    })

}


function logout() {

    fetch(`${url}?bg=logout&key=${api_key}`, {
        method: "POST",
    })
    .then(response => {
        return response
    })
    .catch(err => {
        return err
    })

}



export default {
    login,
    register,
    verify,
    logout
}