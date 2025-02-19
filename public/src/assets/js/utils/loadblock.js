/**
 * @author SilverCore
 * @author silverdium
 * @author MisterPapaye
 */

function loadblock(block, id) {
    let Block = block; 
    const DivID = id;

    if (Block.endsWith(".html")) {
        Block = Block.replace(".html", "");
    }

    const BlockPath = `/src/assets/block/${Block}.html`;

    fetch(BlockPath)
        .then(Response => {
            if (!Response.ok) { 
                let data = 'Erreur lors du chargement de ', Block;
                push(DivID, data)
            }
            return Response.text();
        })
        .then(html => {
            let data = html
            push(DivID, data)
        })
        .catch(err => {
            let data = `Erreur lors du chargement de ${block} : <br> ${err}`
            push(DivID, data)
        })

}

function push(DivID, data) {
    const div = document.getElementById(DivID);
    div.innerHTML = data;
}

function defaultloadblock() {
    loadblock('footer.html', 'footer');
}

defaultloadblock();
