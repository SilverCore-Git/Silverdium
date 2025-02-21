export class skin2D {
    async creatHeadTexture(data) {
        let image = await getData(data)
        return await new Promise((resolve, reject) => {
            image.addEventListener('load', e => {
                let cvs = document.createElement('canvas');
                cvs.width = 64;
                cvs.height = 64;
                let ctx = cvs.getContext('2d');
                ctx.drawImage(image, 8, 8, 8, 8, 0, 0, 64, 64);
                ctx.drawImage(image, 40, 8, 8, 8, 0, 0, 64, 64);
                return resolve(cvs.toDataURL());
            });
        })
    }
}

async function getData(data) {
    if (data.startsWith('http')) {
        let response = await fetch(data).then(response => response.json).then(data => data);
        let buffer = await response.buffer();
        data = `data:image/png;base64,${await buffer.toString('base64')}`;
    }
    let img = new Image();
    img.src = data;
    return img;
}