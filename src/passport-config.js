const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { getUserByEmail, getUserById } = require('./public/js/utils');

async function initialize(passport) {
    const authentificateUser = async (email, password, done) => {
        const user = await getUserByEmail(email)
        if (user === undefined) {
            return done(null, false, { message: "Email incorrecte." })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: "Mot de passe incorrect." })
            }
        } catch(e) {
            return (done(e))
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authentificateUser))
    passport.serializeUser((user, done) => { done(null, user.id) })
    passport.deserializeUser(async (id, done) => {
        return done(null, (await getUserById(id)))
    })
}

module.exports = initialize;