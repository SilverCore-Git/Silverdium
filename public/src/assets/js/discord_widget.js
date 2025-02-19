fetch('/assets/ranks?ext=config')
    .then(respon => respon.json())  // Correct la syntaxe en appelant la méthode json()
    .then(ranks => {
        loadwidget(ranks);  // Passe les ranks à la fonction loadwidget
    })
    .catch(error => console.error('Erreur lors du chargement des ranks:', error)); // Ajouter un catch pour gérer les erreurs

function loadwidget(ranks) {
    fetch('https://discord.com/api/guilds/1285091053011079189/widget.json')
        .then(response => response.json())
        .then(data => {
            const membersContainer = document.getElementById('members');
            data.members.forEach(member => {
                const fonda = ranks.fondateurs;
                const admin = ranks.admin;
                const respon = ranks.respon;
                const dev = ranks.dev;
                const builder = ranks.builder;
                const modo = ranks.moderateurs;
                const bot = ranks.bot;

                const memberDiv = document.createElement('div');
                memberDiv.classList.add('member');

                const img = document.createElement('img');
                img.src = member.avatar_url;

                let username = member.username.split(" | ")[0];  // Supprimer tout après " | "
                username = username.replace(/\s+/g, "");  // Supprimer tous les espaces

                const name = document.createElement('span');
                name.textContent = username;

                // Appliquer la couleur selon le nom d'utilisateur
                if (fonda.includes(username)) {
                    name.classList.add('fonda_color');
                } else if (admin.includes(username)) {
                    name.classList.add('admin_color');
                } else if (dev.includes(username)) {
                    name.classList.add('dev_color');
                } else if (modo.includes(username)) {
                    name.classList.add('modo_color');
                } else if (respon.includes(username)) {
                    name.classList.add('respon_color');
                } else if (bot.includes(username)) {
                    name.classList.add('bot_color');
                } else if (builder.includes(username)) {
                    name.classList.add('builder_color');
                }

                // Ajouter le statut de l'utilisateur
                name.classList.add(`status-${member.status}`);

                memberDiv.appendChild(img);
                memberDiv.appendChild(name);
                membersContainer.appendChild(memberDiv);

            });
            const mem = document.getElementById('members');
            if (data.presence_count >= 10) {
                mem.style.marginTop = 'calc(200% + 100px)';
            } else if (data.presence_count >= 15) {
                mem.style.marginTop = 'calc(200% + 20px)';
            } else if (data.presence_count >= 20) {
                mem.style.marginTop = 'calc(300% + 20px)';
            } else if (data.presence_count >= 25) {
                mem.style.marginTop = 'calc(300% + 100px)';
            } else if (data.presence_count >= 30) {
                mem.style.marginTop = 'calc(400% + 20px)';
            } else if (data.presence_count >= 35) {
                mem.style.marginTop = 'calc(400% + 100px)';
            } else if (data.presence_count >= 40) {
                mem.style.marginTop = 'calc(500% + 20px)';
            }
            
        })
        .catch(error => console.error('Erreur lors du chargement des membres:', error));  // Gérer les erreurs pour le deuxième fetch
}
