const tipeeeurl = 'https://api.tipeee.com/v2.0/projects/silverdium/top/tippers?page=1&perPage=20';
const tipeeeapiurl = 'https://api.tipeee.com/v2.0/projects/silverdium';

fetch(tipeeeurl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok with tipeee api ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    if (data.items && data.items.length > 0) {
      const tipeur = data.items[0].pseudo;
      document.getElementById('tipeurlist').innerText = ` ${tipeur} `;
    } else {
      document.getElementById('tipeurlist').innerText = 'Aucun tipeur trouvé.';
    }
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des tipeurs:', error);
  });

fetch(tipeeeapiurl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok with tipeee api ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    const parameters = data.parameters;
    if (parameters && typeof parameters.tipperAmount !== 'undefined') {
      const Amount = parameters.tipperAmount;
      document.getElementById('tipeuramount').innerHTML = `Total tips : <strong>${Amount} €</strong>`;
    } else {
      document.getElementById('tipeuramount').innerText = 'Montant non disponible.';
    }
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des détails de apitipeee $$.json:', error);
  });