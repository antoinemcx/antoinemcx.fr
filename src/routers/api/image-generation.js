const { createCanvas, loadImage } = require('canvas');
console.log("     * Image generation API loaded")

async function api_canvas_facepalm(req, res) {
    if (!req.query.image) { return res.json({status:false, message: `Missing the image query`}) }
    try {
        const canvas = await createCanvas(632, 357), ctx = canvas.getContext('2d');
    
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 632, 357);
    
        const avatar = await loadImage(req.query.image);
        ctx.drawImage(avatar, 199, 112, 235, 235);
        
        const layer = await loadImage("./src/public/img/api/image-generation/facepalm.png");
        ctx.drawImage(layer, 0, 0, 632, 357);
    
        res.set({ 'Content-Type': 'image/png' });
        res.send(canvas.toBuffer());

    } catch(e) {
        res.json({ status: false, message: e.message })
    }
}

async function api_canvas_blur(req, res) {
    if (!req.query.image) { return res.json({status:false, message: `Missing the image query`}) }
    try {
        const canvas = await createCanvas(512, 512), ctx = canvas.getContext('2d');
        const avatar = await loadImage(req.query.image);
    
        ctx.drawImage(avatar, 0, 0, Math.round(canvas.width / 5), Math.round(canvas.height / 5))
        ctx.drawImage(canvas, 0, 0, canvas.width / 5, canvas.height / 5, 0, 0, (canvas.width+5), (canvas.height+5));
    
        res.set({ 'Content-Type': 'image/png' });
        res.send(canvas.toBuffer());

    } catch(e) {
        res.json({ status: false, message: e.message })
        console.log(e)
    }
};

async function api_canvas_pixelate(req, res) {
    if (!req.query.image) { return res.json({status:false, message: `Missing the image query`}) }
    try {
        const canvas = await createCanvas(512, 512), ctx = canvas.getContext('2d');
        const avatar = await loadImage(req.query.image);
    
        ctx.drawImage(avatar, 0, 0, Math.round(canvas.width / 5), Math.round(canvas.height / 5))
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(canvas, 0, 0, canvas.width / 5, canvas.height / 5, 0, 0, (canvas.width+5), (canvas.height+5));
    
        res.set({ 'Content-Type': 'image/png' });
        res.send(canvas.toBuffer());

    } catch(e) {
        res.json({ status: false, message: e.message })
        console.log(e)
    }
};

async function api_canvas_grayscale(req, res) {
    if (!req.query.image) { return res.json({status:false, message: `Missing the image query`}) }
    try {
        const canvas = await createCanvas(512, 512), ctx = canvas.getContext('2d');
        const avatar = await loadImage(req.query.image);
        ctx.drawImage(avatar, 0, 0, Math.round(canvas.width / 5), Math.round(canvas.height / 5))
        ctx.drawImage(canvas, 0, 0, canvas.width / 5, canvas.height / 5, 0, 0, (canvas.width+5), (canvas.height+5));
        const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height), pixels = imgData.data;

        for (var i = 0; i < pixels.length; i += 4) {
            let lightness = parseInt((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
            pixels[i] = lightness;
            pixels[i + 1] = lightness;
            pixels[i + 2] = lightness;
        }
        ctx.putImageData(imgData, 0, 0);
    
        res.set({ 'Content-Type': 'image/png' });
        res.send(canvas.toBuffer());

    } catch(e) {
        res.json({ status: false, message: e.message })
        console.log(e)
    }
};

module.exports = { api_canvas_blur, api_canvas_facepalm, api_canvas_pixelate, api_canvas_grayscale };