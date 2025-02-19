/**
 * @author SivlerCore
 * @author silverdium
 * @author MisterPapaye
 */

document.addEventListener("DOMContentLoaded", () => {
    const newsUrl = "https://corsproxy.io/?url=https://api.silverdium.fr/dium/launcher/news.json";

    const newsContainer = document.querySelector(".news_contaner");

    if (!newsContainer) {
        console.error("Erreur : Conteneur '.news_contaner' non trouvé !");
        return;
    }

    // Ajout de la classe Swiper à news_contaner
    newsContainer.classList.add("swiper");

    // Création du wrapper Swiper
    const swiperWrapper = document.createElement("div");
    swiperWrapper.classList.add("swiper-wrapper");

    // Insertion du wrapper dans le conteneur
    newsContainer.appendChild(swiperWrapper);

    function createNewsItem(news) {
        const newsItem = document.createElement("div");
        newsItem.classList.add("swiper-slide", "news_block");

        newsItem.innerHTML = `
            <h2 class="news_title">${news.title}</h2>
            <h3>${news.content}</h3>
            <div class="news-footer">Publié par ${news.author} le ${news.publish_date}</div>
        `;
        return newsItem;
    }

    fetch(newsUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur lors du chargement des actualités.");
            }
            return response.json();
        })
        .then((newsList) => {
            if (newsList.length === 0) {
                swiperWrapper.innerHTML = `<div class="news"><h2>Mauvaise nouvelle...</h2><p>Aucune actualité disponible pour le moment.</p></div>`;
                return;
            }

            newsList.forEach((news) => {
                const newsItem = createNewsItem(news);
                swiperWrapper.appendChild(newsItem);
            });

            // Assurons-nous que Swiper est bien initialisé après le rendu des éléments
            setTimeout(() => {
                new Swiper(".swiper", {
                    slidesPerView: "auto",
                    spaceBetween: 20,
                    grabCursor: true,
                    freeMode: true,
                    mousewheel: {
                        forceToAxis: true,
                    },
                });
            }, 100); // Petit délai pour être sûr que le DOM est mis à jour
        })
        .catch((error) => {
            console.error(error);
            swiperWrapper.innerHTML = '<div class="news"><p>Impossible de charger les actualités. Veuillez réessayer plus tard.</p></div>';
        });
});
