function pingServer(url) {
    const startTime = Date.now();
  
    return fetch(url, { method: 'HEAD' })
      .then(response => {
        const endTime = Date.now();
        const latency = endTime - startTime;
        return latency;  // Return the latency to use it later
      })
      .catch(error => {
        return 0;  // If there's an error, return 0
      });
}

function loadmcapi(conf, ping) {
    var mcapiurl = `https://mcapi.us/server/status?ip=${conf.mcip}`;
    fetch(mcapiurl)
        .then(response => response.json())
        .then(mcapi => {
            if (mcapi.status === 'success') {
                console.log(`mcapi.players.now = ${mcapi.players.now}`)
                let playersnb = mcapi.players.now
                document.getElementById('mcsrvOnline').innerText = `En ligne : ${ping}ms`;
                document.getElementById('mcsrvOnline').classList.remove('red');
                document.getElementById('mcsrvOnline').classList.add('green');
                document.getElementById('mcsrvplayers').innerText = `${playersnb}`;
                document.getElementById('motd').innerText = `${mcapi.motd}`;
            } else {
                document.getElementById('mcsrvOnline').innerHTML = `<div class="red">Hors ligne : ${ping}ms</div>`;
                document.getElementById('mcsrvplayers').innerHTML = `<div class="red">0</div>`;
                document.getElementById('motd').innerText = `Serveur offline`;
                document.getElementById('mcsrvOnline').classList.remove('green');
            }
        });
}

fetch('./src/config.json')
    .then(response => response.json())
    .then(config => {
        const conf = config;
        // Ping the server and wait for the response
        pingServer(conf.mcip).then(ping => {
            loadmcapi(conf, ping);
        });
    });
