/**
 * @author SilverCore
 * @author silverdium
 * @author MisterPapaye
 */

// package
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

// libs
const Api = require('./src/api/client.js').default;
const api = new Api();

const AZauth = require('./src/auth/AZauth.js').default;
const azAuth = new AZauth("http://api.dium.silverdium.fr:54/index.php");


// API config / data
const API_CLIENT_DATA = require('./config/API_CLIENT_DATA.json');
const config = require('./config/config.json')
const link_config = require('./config/link.json'); 
const link = link_config;



// launch express
const app = express();

// redirection auto
app.use(express.static(path.join(__dirname, 'public')), cookieParser());

app.get('/tipeee', (req, res) => { res.redirect('/go/tipeee') });
app.get('/discord', (req, res) => { res.redirect('/go/tipeee') });
app.get('/jouer', (req, res) => { res.redirect('/go/rejoindre-silverdium') });
app.get('/rejoindre-silverdium', (req, res) => { res.redirect('/go/rejoindre-silverdium') });

app.get('/robots.txt', (req, res) => { res.redirect('/robots.txt') });
app.get('/sitemap.xml', (req, res) => { res.redirect('/sitemap.xml') });
app.get('/ads.txt', (req, res) => { res.redirect('/ads.txt') });

app.get('/local', (req, res) => {
  const file = req.query.file
  const key = req.query.key
  const callapi = api.conect(key, false)

  if (callapi === true) {
    res.sendFile(path.join(__dirname, file))
  } else {
    res.json(callapi)
  }

})


// to go to a page (mi very good english)
app.get('/go/:page', (req, res) => {

  const page = req.params.page

    if (!page) { res.sendFile(path.join(__dirname, 'public', 'index.html')); }

    else { res.sendFile(path.join(__dirname, 'public', 'src', 'pages', 'views', `${page}.html`)) };

});


// /assets/myfile?ext=css
app.get('/assets/:file', (req, res) => {

  const file = req.params.file
  const ext = req.query.ext

  if (ext.includes('..')) {
    res.send('<h1>Argument non autorisé dans ext')
    return
  }

  if (!file) { res.send('error'); return };
  
  if (ext === 'config') { res.sendFile(path.join(__dirname, 'public', 'src', 'assets', ext, `${file}.json`)) }
  else {
    res.sendFile(path.join(__dirname, 'public', 'src', 'assets', ext, `${file}.${ext}`))
  }

})


// az auth => /auth/page or /auth/az?bg=login&mail=mail@caca.com&passwd=monsuperpasswd&key=apikey
app.get('/auth/:get', (req, res) => {
  console.log("______ Réception d'une requette /auth/")

  const get = req.params.get
  const action = req.query.bg
  const username = req.query.name
  const mail = req.query.mail
  const passwd = req.query.passwd
  const key = req.query.key

  const client = api.conect(key, false);

  if (client) {

    if (get === 'az') {

          // Connexion d'un utilisateur
      if (action === 'login') {
      
        azAuth.login(mail, passwd).then(response => {

          if (response.error) {

            console.log(`Erreur lors de la conection de l'utilisateur : ${response.username}`);
            console.log(response.err)
            azAuth.skin(response.uuid).then(skin => 
              res.json({
                response: response,
                skin: skin
              })
            );

          } else {

            console.log('Nouvelle conection a un compte !')
            console.log({
              mail: mail, 
              passwd: "bas t'a cru je vais te le donner !?",
              az_response: response
            });

            // enregistrer le token dans un cookie
            res.cookie("big_token", response.access_token, {

              httpOnly: true, // Protège contre XSS
              secure: true, // Seulement en HTTPS
              sameSite: "Strict", // Protection CSRF
              maxAge: config.cookie.expire * 60 * 60 * 1000
          
            });

            azAuth.skin(response.uuid).then(skin => 
              res.json({
                response: response,
                skin: skin
              })
            );

          }

        });
    

      }
      
        // Vérification de session
      else if (action === 'verify') {

        const Big_token = req.cookies.big_token;

        azAuth.verify({ access_token: Big_token }).then(response => {

          if (response.error) {

            console.log(`Erreur lors de la verification de l'utilisateur : ${response.username}`);
            azAuth.skin(response.uuid).then(skin => 
              res.json({
                response: response,
                skin: skin
              })
            );

          } else {

            azAuth.skin(response.uuid).then(skin => 
              res.json({
                response: response,
                skin: skin
              })
            );

          }
        })

      }
      
        // Déconnexion
      else if (action === 'logout') {

        const Big_token = req.cookies.big_token;

        res.clearCookie('big_token', { httpOnly: true, secure: false, sameSite: 'Strict' });

        azAuth.logout({ access_token: Big_token }).then(response => res.json(response));

      }

      else {
        res.send("Erreur de configuration de l'action")
      };

    } else {
      res.sendFile(path.join(__dirname, 'public', 'src', 'pages', 'auth', `${get}.html`))
    }};
})



//     A REVOIR !!!!

// ex /api/GOOD_API_KEY?action=get?spec=olala?option=MY_GOOD_OPTION
app.get('/api/:key', (req, res) => {
  console.log("Réception d'une requette vers l'api /api/");

  const action = req.query.action
  const spec = req.query.spec
  const option = req.query.option
  const Key = req.params.key

  if (action) {
    execut_action()
  } else {
    api.conect(Key)
  }

  function execut_action() {
    if (Key) {

      console.log("Client connecter ! API_KEY = ", Key)
      console.log("Information du client :")
      console.log(API_CLIENT_DATA[Key])

      if (action === 'get_launcher') {

        const launcher_github = 'https://github.com/Philippeletug/Silverdium-Launcher';
        const launcher_latest = '1.1.6';
        const launcher_name = 'Silverdium-Launcher';
        const launcher_linux = "Silverdium-Launcher-linux-x86_64.rpm";
        const launcher_win = "Silverdium-Launcher-win-x64.exe";
        const launcher_mac = "Silverdium-Launcher-mac-universal.dmg";

        if (option === 'latest') {
          const download_path = `${launcher_github}/releases/download/${launcher_latest}/`
          res.json ({

            message: "Connection etablie avec l'api !",
            status: "succes",

            launcher_name: launcher_name,
            launcher_latest: launcher_latest,
            version: option,

            github_path: launcher_github,

            launcher_linux: launcher_linux,
            launcher_win: launcher_win,
            launcher_mac: launcher_mac,

            download_path: {
              "main": download_path,
              'linux': download_path + launcher_linux,
              "win": download_path + launcher_win,
              "mac": download_path + launcher_mac,
            }

          })
        } else {
          const download_path = `${launcher_github}/releases/download/${option}/`;
          res.json ({

            message: "Connection etablie avec l'api !",
            status: "succes",

            launcher_name: launcher_name,
            launcher_latest: launcher_latest,
            version: option,

            github_path: launcher_github,

            launcher_linux: launcher_linux,
            launcher_win: launcher_win,
            launcher_mac: launcher_mac,

            download_path: {
              "main": download_path,
              'linux': download_path + launcher_linux,
              "win": download_path + launcher_win,
              "mac": download_path + launcher_mac,
            }
          })
        }
      }

    }
  }




})
app.get('/api', (req, res) => { 
  res.json({
    message: "La clé d'api n'est pas défini...",
    status: "error",
  })
});

app.get('/re', (req, res) => {

  const redir = req.query.direct;
  const err_message = `
    <h1>Erreur valeur de la redirection !</h1>
    <br>Redirect = ${redir}<br>Utilisation : <a href="/re?direct=url de redirection">/re?direct=url de redirection</a>
    <br>Liste des redirection : ${Object.keys(link).join(', ')}, chemin interne avec / <i>ex : <a href="/re?direct=/go/rejoindre-silverdium">/re?direct=/go/rejoindre-silverdium</a>
  `;

  const tipeee = link.tipeee;
  const discord = link.discord;
  const tiktok = link.tiktok;
  const insta = link.insta;
  const youtube = link.youtube;

  if (redir) {

    if (redir.startsWith('/')) { res.redirect(redir) }
    else if (redir === 'tipeee') { res.redirect(tipeee) }
    else if (redir === 'discord') { res.redirect(discord) }
    else if (redir === 'tiktok') { res.redirect(tiktok) }
    else if (redir === 'insta') { res.redirect(insta) }
    else if (redir === 'youtube') { res.redirect(youtube) }

  }
  res.send(err_message)

});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
