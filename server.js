/**
 * @author SilverCore
 * @author silverdium
 * @author MisterPapaye
 */



      //          ###################################
      //          #                                 #
      //          #        CHARGEMENT DIVERS        #
      //          #                                 #
      //          ###################################

// package
const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

// libs
const Api = require('./src/api/client.js');
const api = new Api('c');
const AZauth = require('./src/auth/AZauth.js');
const azAuth = new AZauth("http://api.dium.silverdium.fr:54");

// API config / data
const API_CLIENT_DATA = require('./config/API_CLIENT_DATA.json');
const config = require('./config/config.json')
const link_config = require('./config/link.json'); 
const link = link_config;
const SilverAuth_APIKEY = process.env.SAUTH_API_KEY;



      //          #####################################
      //          #                                   #
      //          #        DEMARRAGE D'EXPRESS        #
      //          #                                   #
      //          #####################################

// launch express
const app = express();

// const options = {
//   key: fs.readFileSync(`/etc/letsencrypt/live/${config.host.name}/privkey.pem`, 'utf8'),
//   cert: fs.readFileSync(`/etc/letsencrypt/live/${config.host.name}/fullchain.pem`, 'utf8'),
// };


app.use((req, res, next) => {
  if (req.hostname !== config.hostname && req.hostname !== `www.${config.hostname}` ) {
    res.end() 
  }
  next();
});



    //          #####################################
    //          #                                   #
    //          #          CHEMINS BASICS           #
    //          #                                   #
    //          #####################################

// redirection auto vers public/ pour app.get('/')
app.use(express.static(path.join(__dirname, 'public')));

// redirection des /pages vers /go/pages
app.get('/tipeee', (req, res) => { res.redirect('/go/tipeee') });
app.get('/discord', (req, res) => { res.redirect('/go/tipeee') });
app.get('/jouer', (req, res) => { res.redirect('/go/rejoindre-silverdium') });
app.get('/rejoindre-silverdium', (req, res) => { res.redirect('/go/rejoindre-silverdium') });

// divers 
app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, 'sitemap.xml'))
})
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'favicon.ico'))
})

// trash
app.get('/api/config', (req, res) => { 

  const key = req.query.key
  const client = api.conect(key, false);

  if (client) {

    res.sendFile(__dirname + "/config/config.json")

  }

});

// proxy
app.get('/api/proxy', async (req, res) => {
  console.log("______ Réception d'une requette /api/proxy/")
  const httpUrl = req.query.http;
  const key = req.query.key;
  const arg1 = req.query.arg1;
  const arg1_n = req.query.arg1_n;

  const client = api.conect(key, false); 

  if (client) {
    try {
      if (arg1) {
        var response = await axios.get(`${httpUrl}?${arg1}=${arg1_n}`, { responseType: 'arraybuffer' });
      } else {
        var response = await axios.get(`${httpUrl}`, { responseType: 'arraybuffer' });
      }
      
      const contentType = response.headers['content-type'] || 'application/octet-stream';
      res.set('Content-Type', contentType);
      
      res.status(200).send(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de la ressource:', error);
      res.status(500).json({ error: 'Impossible de récupérer la ressource' });
    }
  } else {
    res.status(401).json({ error: 'Clé API invalide' });
  }
});

// redirection des pages de auth
app.get('/login', (req, res) => { res.redirect(`http://localhost:8456/popup/auth?action=login&redirect=https://silverdium.fr/auth/callback&key=${SilverAuth_APIKEY}`) });
app.get('/register', (req, res) => { res.redirect(`http://localhost:8456/popup/auth?action=register&redirect=https://silverdium.fr/auth/callback&key=${SilverAuth_APIKEY}`) });
app.get('/auth', (req, res) => { res.redirect('/login') });
app.get('/auth/callback', (req, res) => {
  res.send(`
    <script>
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      fetch("http://localhost:8456/popup/getaccount/" + id)
      .then( window.location.href = 'http://localhost:3000/' );
    </script>
    `)
})

app.get('/user/profile', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'src', 'pages', 'user', `profile.html`) ) });
app.get('/user/skin', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'src', 'pages', 'user', `skin.html`) ) });

// redirection des pages panel admin
app.get('/admin', (req, res) => { res.redirect('https://auth.silverdium.fr/panel/admin') });


// redirection des fichier bots dans racines
app.get('/robots.txt', (req, res) => { res.sendFile(path.join(__dirname, 'robots.txt')) });
app.get('/sitemap.xml', (req, res) => { res.sendFile(path.join(__dirname, 'sitemap.xml')) });
app.get('/ads.txt', (req, res) => { res.sendFile(path.join(__dirname, 'ads.txt')) });





    //          #####################################
    //          #                                   #
    //          #          CHEMINS AVANCE           #
    //          #                                   #
    //          #####################################

// chemin de récuperation des pages ! /go/page = page.html dans public/src/pages/views/
app.get('/go/:page', (req, res) => {

  const page = req.params.page

    if (!page) { res.sendFile(path.join(__dirname, 'public', 'index.html')); }

    else { res.sendFile(path.join(__dirname, 'public', 'src', 'pages', 'views', `${page}.html`)) };

});


// chemin de récuperation des ressources type assets. use ==> /assets/myfile?ext=css => assets/ext/myfile.ext
app.get('/assets/auth', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'src', 'pages', 'auth', 'js', `auth.js`) ) })
app.get('/assets/salert', (req, res) => { res.sendFile(path.join(__dirname, 'public', 'src', 'assets', 'js', 'utils', `salert.js`) ) })
app.get('/assets/:file', (req, res) => {

  const file = req.params.file
  const ext = req.query.ext

  if (ext.includes('..')) {
    res.send('<h1>Argument non autorisé dans ext')
    return
  }

  if (file.includes('..')) {
    res.send('<h1>Argument non autorisé')
    return
  }

  if (!file) { res.send('error'); return };
  
  if (ext === 'config') { res.sendFile(path.join(__dirname, 'public', 'src', 'assets', ext, `${file}.json`)) }
  else {
    res.sendFile(path.join(__dirname, 'public', 'src', 'assets', ext, `${file}.${ext}`))
  }

})

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

app.get('/get/silverauth/apikey', (req, res) => {

  const referer = req.get('Referer');

  if (req.hostname === config.hostname) {
    if (referer == `http://${config.hostname}:3000/`) {
      return res.json({key: SilverAuth_APIKEY})
    }
  };

  res.end();

})

app.get('/get/mydata', (req, res) => {

  const fullInfo = {
    method: req.method,
    url: req.url,
    originalUrl: req.originalUrl,
    baseUrl: req.baseUrl,
    path: req.path,
    protocol: req.protocol,
    secure: req.secure,
    hostname: req.hostname,
    ip: req.ip,
    ips: req.ips,
    subdomains: req.subdomains,
    headers: req.headers,
    contentType: req.get('Content-Type'),
    userAgent: req.get('User-Agent'),
    cookies: req.cookies || {},
    signedCookies: req.signedCookies || {},
    query: req.query,
    params: req.params,
    body: req.body,
    xhr: req.xhr,
    fresh: req.fresh,
    stale: req.stale,
    protocol: req.protocol,
    acceptedLanguages: req.acceptsLanguages(),
    acceptedCharsets: req.acceptsCharsets(),
    acceptedEncodings: req.acceptsEncodings(),
    acceptedTypes: req.accepts(),
  };

  res.json(fullInfo);

})

app.use((req, res) => {
  res.status(404).redirect('https://api.silverdium.fr/www.errors/404.html');
});

const PORT = 3000;
http.createServer(app).listen(PORT, () => {
  console.log(`HTTPS server listen on https://${config.hostname}:${PORT}`);
}); 