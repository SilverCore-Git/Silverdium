//      Général
let racine = ''
let launchversion = '1.0.7';
let domainename = 'silverdium.fr';
let productname = `Silverdium-Launcher`;
let giturl = 'https://github.com/Philippeletug/Silverdium-Launcher';

// navbar
let hrefindex = `/${domainename}`;
let hreftipeee = `tipeee.html`;
let hrefservmc = `servmc.html`;
let hreflauncher = `launcher.html`;

// launcher
let launchWin = `${productname}-win-x64.exe`;
let launchMac = `${productname}-mac-universal.dmg`;
let launchLinux = `${productname}-linux-x86_64.AppImage`;

// link
let discordurl = 'https://discord.gg/tW2EQ4EsD6';
let tipeeeurl = 'https://tipeee.com/silverdium';
let rickrollurl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'

//      général
function btn(href) {
    if (href === 'discord') {
        window.location.href = (`${discordurl}`)
    } else if (href === 'tipeee') {
        window.location.href = (`${tipeeeurl}`)
    } else if (href === 'rickroll') {
        window.location.href = (`${rickrollurl}`)
    }
    // window.location.href = `http://${href}.${domainename}`;
}

function btnlink(page) {
    if (page === 'index') {
        window.location.href = (`${racine}/${hrefindex}`)
    } else if (page === 'tipeee') {
        window.location.href = (`${racine}/${hreftipeee}`)
    } else if (page === 'servmc') {
        window.location.href = (`${racine}/${hrefservmc}`)
    } else if (page === 'launcher') {
        window.location.href = (`${racine}/${hreflauncher}`)
    }
}


//     Launcher
function downloadlauncher(platform) {
    if (platform === 'Win') {
        window.location.href = (`${giturl}/releases/download/${launchversion}/${launchWin}`)
    } else if (platform === 'Mac') {
        window.location.href = (`${giturl}/releases/download/${launchversion}/${launchMac}`)
    } else if (platform === 'Linux') {
        window.location.href = (`${giturl}/releases/download/${launchversion}/${launchLinux}`)
    }
}