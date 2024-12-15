fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    let ipaddress = data.ip
});



function datatracker() {
    console.log(`Ip address : ${ipaddress}`);
}

datatracker();

