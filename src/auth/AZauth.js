/**
 * @author SivlerCore
 * @author silverdium
 * @author MisterPapaye
 */

import nodeFetch from 'node-fetch';

export default class AZauth {
    constructor(baseUrl) {
        this.url = `${baseUrl}/api/auth`;
        this.skinAPI = `${baseUrl}/api/skin-api/skins`;
    }

    /**
     * Connexion de l'utilisateur
     */
    async login(username, password, A2F = null) {
        try {
            const mail = username;
            const passwd = password;

            let response = await nodeFetch(`${this.url}/authenticate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: mail, 
                    password: passwd, 
                    code: A2F
                })
            }).then(res => res.json());

            if (response.status === 'pending' && response.reason === '2fa') {
                return { A2F: true };
            }

            if (response.status === 'error') {
                return { error: true, message: response.message };
            }

            return {
                access_token: response.access_token,
                client_token: response.uuid,
                uuid: response.uuid,
                name: response.username,
                user_properties: '{}',
                user_info: {
                    id: response.id,
                    banned: response.banned,
                    money: response.money,
                    role: response.role
                },
                meta: { online: false, type: 'AZauth' }
            };
        } catch (error) {
            return { error: true, message: "Erreur de connexion au serveur", err: error };
        }
    }

    /**
     * Vérification du token d'authentification
     */
    async verify(user) {
        try {
            let response = await nodeFetch(`${this.url}/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ access_token: user.access_token })
            }).then(res => res.json());

            if (response.status === 'error') {
                return { error: true, message: response.message };
            }

            return {
                access_token: response.access_token,
                client_token: response.uuid,
                uuid: response.uuid,
                name: response.username,
                user_properties: '{}',
                user_info: {
                    id: response.id,
                    banned: response.banned,
                    money: response.money,
                    role: response.role
                },
                meta: { online: false, type: 'AZauth' }
            };
        } catch (error) {
            return { error: true, message: "Erreur de vérification de session" };
        }
    }

    /**
     * Déconnexion de l'utilisateur
     */
    async logout(user) {
        try {
            let response = await nodeFetch(`${this.url}/logout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ access_token: user.access_token })
            }).then(res => res.json());

            return response.error ? false : true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Gestion du skin de l'utilisateur
     */
    async skin(uuid) {
        let response = await nodeFetch(`${this.skinAPI}/${uuid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if (response.status == 404) {
            return {
                url: `${this.skinAPI}/${uuid}`
            }
        }

        response = await response.buffer()
        return {
            url: `${this.skinAPI}/${uuid}`,
            base64: "data:image/png;base64," + response.toString('base64'),
        }
    }
}
