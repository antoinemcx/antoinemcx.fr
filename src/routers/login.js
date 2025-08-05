console.log("     * Login system loaded");
const bcrypt = require('bcrypt');
const { website } = require('../../config');

async function logout(req, res) {
    req.secret = website.cookieKey;
    res.clearCookie('session');
    res.clearCookie('session.sig');

    res.redirect('/login');
};

async function post_register(req, res) {
    const { username, email, password, password_confirm } = req.body;
    try {
        const search = await global.db.query('SELECT id,username,email FROM users WHERE email = ? or username = ?', [email, username]);

        if (search[0] !== undefined) { return res.render('register.ejs', { message: ['error', "Email ou nom d'utilisateur déjà utilisé."] })
        } else if (username.length < 3 || username.length > 20) { return res.render('register.ejs', { message: ['error', "Le nom d'utilisateur doit être entre 2 et 32 caractères."] })
        } else if (password.length < 4 || password.length > 500) { return res.render('register.ejs', { message: ['error', "Le mot de passe doit être entre 4 and 500 caractères."] })
        } else if (password !== password_confirm) { return res.render('register.ejs', { message: ['error', "Les mots de passes ne correspondent pas."] }) }

        const hashedPassword = await bcrypt.hash(password, 10)
        function generateID(length) {
            const values = '0123456789';
            let id = '';
            for (let _length = 0; _length < length; _length++) id += values[Math.floor(Math.random() * values.length)];

            global.db.query(`SELECT * FROM users WHERE id = "${id}"`).then(rows => { if (rows[0] !== undefined) { generateID(15) } })
            return id;
        };

        global.db.query('INSERT INTO users (id,username,email,password) VALUES (?,?,?,?)', [generateID(15), username, email, hashedPassword], (err, results) => {
            if (err) { console.log(err) }
            else {
                return res.render('register.ejs', { message: ['success', "Utilisateur enregistré avec succès."] })
            }
        })
        res.redirect('/login')
    } catch(e) {
        console.log(e)
        res.redirect('/register')
    }
};

async function login(req, res, lang) {
    if (req.isAuthenticated()) { return res.redirect('/') }
    const { header, loginPage } = require(`../public/languages/${lang || 'fr-FR'}.json`);
    res.render('login.ejs', { req, translate: { header, loginPage }, lang: lang || 'fr-FR', message: null })
};

async function register(req, res, lang) {
    const { header, errors } = require(`../public/languages/${lang || 'fr-FR'}.json`);

    // checkAdmin
    if (req.isAuthenticated()) {
        if (req.user.role !== 'admin') { return res.render('error.ejs', {
            req, code: 403, message: errors.admin[0], subMessage: errors.admin[1], translate: { header, errors }, lang: lang || 'fr-FR'
        }) }
    } else {
        res.render('error.ejs', {
            req, code: 403, message: errors.admin[0], subMessage: errors.admin[1], translate: { header, errors }, lang: lang || 'fr-FR'
        }); return;
    }

    res.render('register.ejs', { req, translate: { header }, lang: lang || 'fr-FR', message: null })
};


module.exports = { logout, post_register, login, register };