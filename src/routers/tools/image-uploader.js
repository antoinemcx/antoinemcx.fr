const { ImgurClient } = require("imgur"); const fs = require("fs");
const imgur = new ImgurClient({ clientId: `0aaeff45ce1ef81` });
console.log("     * Image-uploader tool loaded")

async function tools_imageUploader(req, res, lang) {
    const { header, toolsImageUploader } = require(`../../public/languages/${lang || 'fr-FR'}.json`);
    res.render('tools/image-uploader.ejs', { req, translate: { header, toolsImageUploader }, lang: lang || 'fr-FR' });
}
async function tools_imageUploader_admin(req, res) {
    const { header } = require(`../../public/languages/fr-FR.json`);
    res.render('tools/image-uploader-admin.ejs', { req, translate: {header}, lang: 'fr-FR' });
}
async function tools_passwordGenerator(req, res, lang) {
    const { header, toolsPasswordGenerator } = require(`../../public/languages/${lang || 'fr-FR'}.json`);
    res.render('tools/password-generator.ejs', { req, translate: { header,toolsPasswordGenerator }, lang: lang || 'fr-FR' });
}

async function tools_upload(req, res, lang) {
    const { header, imageUploaded } = require(`../../public/languages/${lang || 'fr-FR'}.json`);
    let sampleFile = req.body.fileUrl;
    if (sampleFile) {
        if (!sampleFile.includes('.jpeg') && !sampleFile.includes('.jpg') && !sampleFile.includes('.gif') && !sampleFile.includes('.png') && !sampleFile.includes('.webp')) { return res.status(400).send(`Le lien fourni est incovalide. Ré-essayez.`) }
        if (sampleFile.length < 8) { return res.status(400).send(imageUploaded.errors[0]) }
        imgur.upload({ image: sampleFile, type: 'stream' }).then((urlObject) => {
            if (urlObject.success === false) { return res.status(400).send(imageUploaded.errors[1]) }
            res.render('tools/image-uploaded.ejs', { req, link: urlObject.data.link, width: urlObject.data.width, height: urlObject.data.height, lang: lang || 'fr-FR', translate: { header, imageUploaded } })
        }); return;
    } else {
        if (!req.files) { return res.status(400).send(imageUploaded.errors[2]) }
        sampleFile = req.files.sampleFile;
        let uploadPath = `./src/uploads/${sampleFile.name}`;

        sampleFile.mv(uploadPath, function(err) {
            if (err) { return res.status(500).send(err) }

            imgur.upload({ image: fs.createReadStream(uploadPath), type: 'stream' }).then((urlObject) => {
                fs.unlinkSync(uploadPath)
                if (urlObject.success === false) { return res.status(400).send(imageUploaded.errors[3]) }
                res.render('tools/image-uploaded.ejs', {
                    req, link: urlObject.data.link, width: urlObject.data.width, height: urlObject.data.height, lang: lang || 'fr-FR', translate: { header, imageUploaded }
                })
            })
        })
    }
}

async function tools_upload_admin(req, res) {
    const { header, imageUploaded } = require(`../../public/languages/fr-FR.json`);
    if (!req.files) { return res.status(400).send(`Aucun fichier n'a été chargé. Ré-essayez.`) }
    sampleFile = req.files.sampleFile;
    let uploadPath = `./src/public/files/${sampleFile.name}`;

    try {
        sampleFile.mv(uploadPath, function(err) {
            if (err) { return res.status(500).send(err) }
            res.render('tools/image-uploaded.ejs', {
                req, link: `https://antoinemcx.fr/files/${sampleFile.name}`, width: 0, height: 0, lang: 'fr-FR', translate: { header, imageUploaded }
            })
        })
    } catch(e) { res.status(400).send(`Une erreur est survenue, l'image est invalide`) }
}

module.exports = { tools_imageUploader, tools_imageUploader_admin, tools_passwordGenerator, tools_upload, tools_upload_admin };