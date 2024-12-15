
    let ranksUrl = "https://raw.githubusercontent.com/Philippeletug/Silverdium/main/ranks.json";

    fetch(ranksUrl)
        .then(response => {
            if (!response.ok) {
                console.error(`Erreur lors du chargement des données : ${response.status}`);
                throw new Error('Erreur de chargement des données');
            }
            return response.json();
        })
        .then(datarank => {
            // affichage des data :
            console.log('------ Affichage des dataranks ------');
            console.log(`fonda = ${datarank.ranks.administration.fondateurs}`);
            console.log(`respon = ${datarank.ranks.responsables}`);
            console.log(`supmodo = ${datarank.ranks.staff.supmodo}`);
            console.log(`modo = ${datarank.ranks.staff.modo}`);
            console.log(`helpeurs = ${datarank.ranks.staff.helpeur}`);
            console.log(`Silverdium.fr = ${datarank.developersprog.silverdiumfr}`);
            console.log(`Silverdium-Launcher = ${datarank.developersprog.SilverdiumLauncher}`);

            let ranks = datarank["ranks"];

            let listfonda = ranks["administration"]["fondateurs"];
            let listrespon = ranks["responsables"];

            let staff = ranks["staff"];
            let listsupmodo = staff["supmodo"];
            let listmodo = staff["modo"];
            let listhelp = staff["helpeur"];

            let devprog = datarank["developersprog"];
            let listdevsdfr = datarank?.developersprog?.Silverdiumfr;
            let listdevsl = devprog["SilverdiumLauncher"];

            // Définir les titres dans le DOM
            const adminElem = document.getElementById('administration');
            const fondateursElem = document.getElementById('fondateurs');
            const responsableElem = document.getElementById('responsable');
            const developpeursElem = document.getElementById('developpeurs');
            const listFondaContainer = document.getElementById('liststaff-fonda');
            const listResponContainer = document.getElementById('liststaff-respon');
            const listSupmodoContainer = document.getElementById('liststaff-supmodo');
            const listModoContainer = document.getElementById('liststaff-modo');
            const listHelpContainer = document.getElementById('liststaff-helpeur');
            const listdevsdfrContainer = document.getElementById('liststaff-devsdfr');
            const listdevslContainer = document.getElementById('liststaff-devsl');
            const devprogElem = document.getElementById('devprog');

            const appendToList = (container, list) => {
                if (container) {
                    list.filter(member => member.trim() !== "").forEach(member => {
                        const listItem = document.createElement('li');
                        listItem.innerText = member;
                        container.appendChild(listItem);
                    });
                }
            };
            

            appendToList(listFondaContainer, listfonda);
            appendToList(listResponContainer, listrespon);
            appendToList(listSupmodoContainer, listsupmodo);
            appendToList(listModoContainer, listmodo);
            appendToList(listHelpContainer, listhelp);
            appendToList(listdevslContainer, listdevsl);
            appendToList(listdevsdfrContainer, listdevsdfr);

        })
        .catch(error => {
            console.error('Erreur:', error);
        });
