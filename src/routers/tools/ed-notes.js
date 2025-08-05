const { getNotes } = require('../api/ecole-directe-api/Session');
const { header } = require(`../../public/languages/fr-FR.json`);
const moment = require('moment')
const jwt = require('jsonwebtoken');
const { website, production } = require('../../../config');
console.log("     * ED notes tool loaded");


async function tools_edNotes_login(req, res) {
    const cookieHeader = req.headers.cookie && req.headers.cookie.split('; ').filter(cookie => cookie.startsWith('jwt-auth'));
    const token = cookieHeader && cookieHeader[0] && cookieHeader[0].split('=')[1];

    if (!token) { res.render('tools/ecole-directe.ejs', { req, translate: {header}, lang: 'fr-FR' }) }
    else { res.redirect(`${production ? 'https://tools.antoinemcx.fr' : 'http://localhost:9000'}/ecole-directe`) }
}

async function tools_ecoleDirecte(req, res) {
    const cookieHeader = req.headers.cookie && req.headers.cookie.split('; ').filter(cookie => cookie.startsWith('jwt-auth'));
    const token = cookieHeader && cookieHeader[0] && cookieHeader[0].split('=')[1];

    if (!token) {
        res.redirect(`${production ? 'https://tools.antoinemcx.fr' : 'http://localhost:9000'}/ecole-directe/login`)
    } else {
        jwt.verify(token, website.jwtSecret, async (err, user) => {
            if (err) { return console.log(err) }

            req.body.username = user.username;
            req.body.password = user.password;
            await tools_edNotes(req, res, true)
        })
    }
}

async function tools_edNotes_logout(req, res) {
    const cookieHeader = req.headers.cookie && req.headers.cookie.split('; ').filter(cookie => cookie.startsWith('jwt-auth'));
    const token = cookieHeader && cookieHeader[0] && cookieHeader[0].split('=')[1];

    if (!token) { res.redirect(`${production ? 'tools.antoinemcx.fr' : 'localhost:9000'}/ecole-directe/login`) }
    else {
        await res.clearCookie('jwt-auth')
        await res.redirect(`${production ? 'https://tools.antoinemcx.fr' : 'http://localhost:9000'}/ecole-directe/login`)
    }
}

async function tools_edNotes(req, res, isJwt) {
    try {
        const user = { username: req.body.username, password: req.body.password }
        const data = await getNotes(user.username, user.password);

        if (isJwt === false) {
            const accessToken = generateAccessToken(user);

            res.cookie('jwt-auth', accessToken, {
                secure: production,
                httpOnly: true,
                maxAge: 150 * 86400
            });
        }

        let quarter;
        if (req.query.trimestre && req.query.trimestre === '1') { quarter = 1 }
        if (req.query.trimestre && req.query.trimestre === '2') { quarter = 2 }
        if (req.query.trimestre && req.query.trimestre === '3') { quarter = 3 }
        const periodes = data.periodes;
        const now = moment();
        const actualDate = now.format('YYYY-MM-DD');

        if (!quarter && periodes[2].annuel !== true) {
            const diff1 = now.diff(periodes[0].dateFin, "days");
            const diff2 = now.diff(periodes[1].dateFin, "days");
            const diff3 = now.diff(periodes[2].dateFin, "days");

            if (diff3 <= 0) { quarter = 3 }
            if (diff2 <= 0) { quarter = 2 }
            if (diff1 <= 0) { quarter = 1 }
            if (diff3 > 0 && diff2 > 0 && diff1 > 0) { quarter = 3 }
        }
        
        res.render('tools/ed-notes.ejs', { req, res, notes: data.notes, account: data.account, trimestre: quarter, actualDate, translate: {header}, lang: 'fr-FR' })
    } catch(err) { return res.render('tools/ecole-directe.ejs', { req, messages: { error: err }, translate: {header}, lang: 'fr-FR' }) }
}

function generateAccessToken(user) {
    return jwt.sign(user, website.jwtSecret, { expiresIn: '150 days' });
}

module.exports = { tools_ecoleDirecte, tools_edNotes_login, tools_edNotes_logout, tools_edNotes };