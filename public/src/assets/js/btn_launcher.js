/**
 * @author SilverCore
 * @author silverdium
 * @author MisterPapaye
 */

const Launcher_version = '1.1.6'

const Launcher_Name = 'Silverdium-Launcher'

const LauncherRepo_Path = 'https://github.com/Philippeletug/Silverdium-Launcher'

function downl(os) {
    if (os === 'linux') { this.osExt = 'x86_64.rpm' }
    else if (os === 'win') { this.osExt = 'x64.exe' }
    else if (os === 'mac') { this.osExt = 'universal.dmg' };
    window.location.href = `${LauncherRepo_Path}/releases/download/${Launcher_version}/${Launcher_Name}-${os}-${this.osExt}`;
}

function github(repo) {
    if (repo === 'launcher') { window.open(LauncherRepo_Path, '_blank') }
}