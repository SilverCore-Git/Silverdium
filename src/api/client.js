/**
 * @author SivlerCore
 * @author silverdium
 * @author MisterPapaye
 */


export default class api {

    async KEY_INFO(api_key) {
        try {
            const api_key_info = API_CLIENT_DATA.api_key
            return api_key_info
        } catch (error) {
            return {
                status: "error",
                message: error
            }
        }
    };

    async conect(KEY, info) {
        try {
            if (API_CLIENT_DATA.hasOwnProperty(KEY)) {
                const client = API_CLIENT_DATA[KEY];
                if (info) {
                    return {

                    message: "Connection etablie avec l'api !",
                    status: "succes",
                    api_key: client.key,
                    domain: client.domain,
                    owner: client.owner,
                    max_request: client.max_request,
                    create_date: client.create_date,
                    expir_date: client.expir_date
                    
                    }
                }
                return true
            } else {
                return {
                    message: "La clé d'api n'existe pas...",
                    status: "error",
                }
            }
        } catch (error) {
            return {
                status: "error",
                message: error
            }
        }
    }

}