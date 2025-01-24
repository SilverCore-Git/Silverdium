// 
// @autor = Silverdium
// @autor = SilverCore
// @autor = MisterPapaye
// 

document.addEventListener("DOMContentLoaded", () => {
    const newsUrl = "https://corsproxy.io/?url=https://api.silverdium.fr/dium/launcher/news.json";

    // Cibles dans le DOM
    const newsContainer = document.getElementById("news-container");

    // Fonction pour créer un élément d'actualité
    function createNewsItem(news) {
        const newsItem = document.createElement("div");
        newsItem.className = "news";

        newsItem.innerHTML = `
            <h2 class="underline">${news.title}</h2>
            <p>${news.content}</p>
            <div class="news-meta">Publié par ${news.author} le ${news.publish_date}</div>
        `;
        return newsItem;
    }

    // Récupérer les données des actualités
    fetch(newsUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur lors du chargement des actualités. (pourquoi le monde est si cruel !??");
            }
            return response.json();
        })
        .then((newsList) => {
            if (newsList.length === 0) {
                newsContainer.innerHTML = `<div class="news"><h2>Mauvaise nouvelle...</h2><p>Aucune actualité disponible pour le moment.</p></div>`;
                return;
            }

            // Ajouter chaque actualité dans son propre conteneur
            newsList.forEach((news) => {
                const newsItem = createNewsItem(news);
                const newsBlock = document.createElement("div");
                newsBlock.className = "news-block";

                newsBlock.appendChild(newsItem);
                newsContainer.appendChild(newsBlock);
            });
        })
        .catch((error) => {
            console.error(error);
            newsContainer.innerHTML = '<div class="news"><p>Impossible de charger les actualités. Veuillez réessayer plus tard. (ohh non pourquoi !!!!!)</p></div>';
        });
});
