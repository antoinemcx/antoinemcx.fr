console.log("     * General files & redirections loaded");
const config = require("../../config.js");

const imagePlaceholer = "https://citygem.app/wp-content/uploads/2024/08/placeholder-1-1.png";

async function main(req, res, lang) {
    const { mainPage, header } = require(`../public/languages/${lang || "fr-FR"}.json`);

    const meliooff = await fetchDiscordUser(config.owner);
    const meliodas = await fetchDiscordUser(`562571094947659783`);
    const naybor = await fetchDiscordUser(`793213992910585898`);

    res.render("index.ejs", {
        req,
        username: meliooff.username,
        tag: meliooff.discriminator,
        avatar: meliooff.avatar ? `${await getAvatar(meliooff)}` : imagePlaceholer,
        meliodas: meliodas.avatar ? `${await getAvatar(meliodas)}` : imagePlaceholer,
        naybor: naybor.avatar ? `${await getAvatar(naybor)}` : imagePlaceholer,
        translate: { mainPage, header },
        lang: lang || 'fr-FR'
    });
};
async function post_main(req, res) {
    let rBody = req.body;
    
    if (!rBody['name'] || rBody['name'].length < 3) {
        res.redirect('?error=Nom invalide#contact'); return
    }
    if (rBody['email'].length < 8 || !rBody['email'].includes('@') || !rBody['email'].includes('.')) {
        res.redirect('?error=Email invalide#contact'); return;
    }
    if (rBody['discordId'] && rBody['discordId'].length > 3 && isNaN(rBody['discordId'])) {
        res.redirect('?error=ID invalide#contact'); return
    }
    if (rBody['message'].length < 25) {
        res.redirect('?error=Message trop court#contact'); return
    }
    res.redirect('?success=Message envoyé avec succès#contact');

    if (global.bot) {
        global.bot.channels.cache.get('793784209792565268').send({embeds: [{
            color: global.bot.color.messagecolor.embed,
            title: `Nouveau message venant de antoinemcx.fr`,
            description: `Nom : \`${rBody['name']}\`\nEmail : \`${rBody['email']}\`\nDiscord ID : \`${rBody['discordId'] && rBody['discordId'].length > 3 ? rBody['discordId'] : 'N/A'}\`
\nMessage : \`\`\`${rBody['message']}\`\`\``,
            timestamp: new Date(),
        }]});
    }
};

async function legal(req, res, lang) {
    const { legalPage, header } = require(`../public/languages/${lang || 'fr-FR'}.json`);
    res.render('subpages/legal.ejs', { req, res, translate: { legalPage, header }, lang: lang || 'fr-FR' })
}
async function tools(req, res, lang) {
    const { toolsPage, header } = require(`../public/languages/${lang || 'fr-FR'}.json`);
    res.render('subpages/tools.ejs', { req, translate: { toolsPage, header }, lang: lang || 'fr-FR' })
};

async function api_endpoints(req, res, lang) {
    const { endpointsPage, header } = require(`../public/languages/${lang || 'fr-FR'}.json`);
    res.render('subpages/endpoints.ejs', { req, translate: { header, endpointsPage }, lang: lang || 'fr-FR' })
}

async function getAvatar(user) {
    const avatarFormat = user.avatar && user.avatar.startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${avatarFormat}?size=512`
};

async function sitemap(req, res) {
    let link = "<url><loc>https://antoinemcx.fr/</loc></url>\n<url><loc>https://forum.antoinemcx.fr/</loc></url>\n<url><loc>https://api.antoinemcx.fr/endpoints/</loc></url>";
    let tools = ['image-uploader', 'url-shortener', 'password-generator'];
    tools.forEach(tool => { link += "\n<url><loc>https://tools.antoinemcx.fr/" + tool + "</loc></url>"; })
    res.set('Content-Type', 'text/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="https://www.google.com/schemas/sitemap-image/1.1">${link}</urlset>`);
};

async function ads(req, res) {
    res.set('Content-Type', 'text/plain');
    res.send("google.com, pub-4243809396450828, DIRECT, f08c47fec0942fa0");
};

async function fetchDiscordUser(userId) {
    try {
        const response = await fetch(`https://discord.com/api/v10/users/${userId}`, {
            headers: { Authorization: `Bot ${config.token}` }
        });
        
        if (!response.ok) {
            throw new Error(`Discord API error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error(`Error fetching Discord user ${userId}:`, error);
        return null;
    }
}

module.exports = { main, post_main, legal, tools, api_endpoints, sitemap, ads };