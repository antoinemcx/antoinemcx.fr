const { header, errors } = require(`../../public/languages/fr-FR.json`);
console.log("     * Url-shortener tool loaded");

async function tools_urlShortener(req, res, lang) {
    const { header, toolsUrlShortener } = require(`../../public/languages/${lang || 'fr-FR'}.json`);
    res.render('tools/url-shortener.ejs', { req, longURL: null, shortURL: null, translate: { header, toolsUrlShortener }, lang: lang || 'fr-FR' });
}
async function tools_post_urlShortener(req, res) {
    db.query(`INSERT INTO urlShortener VALUES ('${req.body.longURL}', '${req.body.shortURL}');`).catch(e => console.log(e));
}

async function tools_shortURL(req, res) {
    const shortURL = req.originalUrl.replace('/', '');

    global.db.query(`SELECT * FROM urlShortener WHERE short = "${shortURL}"`).then(rows => {
        if (rows[0] !== undefined) {
            res.redirect(rows[0].longURL);
        } else {
            if (shortURL.startsWith('files/')) {
                res.status(404).render('error.ejs', {
                    req, code: 404, message: "Ce fichier est introuvable !", subMessage: "Il n'existe pas, vérifiez le nom du fichier.", lang: 'fr-FR', translate: { header, errors }
                })
            } else {
                res.redirect('https://antoinemcx.fr');
            }
        }
    });
}

module.exports = { tools_urlShortener, tools_post_urlShortener, tools_shortURL };