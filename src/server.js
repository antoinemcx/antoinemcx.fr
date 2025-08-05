const http = require("http");
const express = require("express");
const config = require("../config.js");

module.exports = async () => {
    const { default: fetch } = await import("node-fetch");
    const app = express();
    const server = http.createServer(app);
    app.set('view engine', 'ejs');
    app.set('views', 'src/views');
    app.use(express.static("src/public"));

    app.get("/", async (req, res) => {
        try {
            const response = await fetch(`https://discord.com/api/v10/users/${config.owner}`, {
                headers: { Authorization: `Bot ${config.token}` }
            });
            const user = await response.json();
            if (user && user.id) {
                const avatarFormat = user.avatar && user.avatar.startsWith('a_')
                    ? 'gif' : 'png';

                res.render('index.ejs', {
                    username: user.username,
                    tag: user.discriminator,
                    avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${avatarFormat}?size=512`,
                    formspree: config.formspree,
                });
            }
        } catch (err) {
            console.error("Error fetching user data:", err);
        }
    });
    
    app.get("/dc", (req, res) => { res.redirect(`https://discord.gg/G6WQsMQShZ`) });
    app.get("/discord", (req, res) => { res.redirect(`https://discord.gg/G6WQsMQShZ`) });

    app.use((req, res) => {
        res.redirect('/');
    });

    const listener = server.listen(9000, '127.0.0.1', function() {
        console.log(`Your app is listening on port ${listener.address().port}`);
    });
}