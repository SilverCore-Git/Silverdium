// Utilisation d'un proxy CORS pour contourner les restrictions CORS
let ranksUrl = "https://corsproxy.io/https://api.silverdium.fr/json/ranks/ranks.json";
console.log('URL de la requête :', ranksUrl);

fetch(ranksUrl)
    .then(response => {
        // Vérifie si la réponse est valide (code HTTP 2xx)
        if (!response.ok) {
            console.error(`Erreur lors du chargement des données : ${response.status} - ${response.statusText}`);
            throw new Error('Erreur de chargement des données');
        }
        return response.json();
    })
    .then(datarank => {
        // Vérification de la structure des données avant utilisation
        const ranks = datarank?.ranks;
        if (!ranks) {
            console.error('Les données "ranks" sont manquantes.');
            return;
        }

        const staff = ranks?.staff;
        if (!staff) {
            console.error('Les données "staff" sont manquantes.');
            return;
        }

        // Extraction des différentes listes
        let listfonda = ranks?.administration?.fondateurs || [];
        let listrespon = ranks?.responsables || [];
        let listsupmodo = staff?.supmodo || [];
        let listmodo = staff?.modo || [];
        let listhelp = staff?.helpeur || [];
        let listdevsdfr = datarank?.developersprog?.Silverdiumfr || [];
        let listdevsl = datarank?.developersprog?.SilverdiumLauncher || [];
        let listdevsk = datarank?.developersprog?.SivlerSK || [];
        let listdev = staff?.dev || [];

        // Sélection des éléments DOM
        const listFondaContainer = document.getElementById('liststaff-fonda');
        const listResponContainer = document.getElementById('liststaff-respon');
        const listSupmodoContainer = document.getElementById('liststaff-supmodo');
        const listModoContainer = document.getElementById('liststaff-modo');
        const listHelpContainer = document.getElementById('liststaff-helpeur');
        const listdevsdfrContainer = document.getElementById('liststaff-devsdfr');
        const listdevslContainer = document.getElementById('liststaff-devsl');
        const listdevskContainer = document.getElementById('liststaff-devsk');
        const listdevContainer = document.getElementById('liststaff-dev');

        // Fonction pour ajouter des membres dans les listes
        const appendToList = (container, list) => {
            if (container) {
                list.filter(member => member.trim() !== "").forEach(member => {
                    const listItem = document.createElement('li');
                    listItem.innerText = member;
                    container.appendChild(listItem);
                });
            } else {
                console.error('Conteneur introuvable dans le DOM pour la liste.');
            }
        };

        // Ajouter les données dans les conteneurs DOM respectifs
        appendToList(listFondaContainer, listfonda);
        appendToList(listResponContainer, listrespon);
        appendToList(listSupmodoContainer, listsupmodo);
        appendToList(listModoContainer, listmodo);
        appendToList(listHelpContainer, listhelp);
        appendToList(listdevsdfrContainer, listdevsdfr);
        appendToList(listdevslContainer, listdevsl);
        appendToList(listdevskContainer, listdevsk);
        appendToList(listdevContainer, listdev);

    })
    .catch(error => {
        // Gestion des erreurs de la requête
        console.error('Erreur:', error);
        alert("Une erreur est survenue lors du chargement des données. Veuillez réessayer plus tard.");
    });
