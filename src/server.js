const http = require("http");
const bodyParser = require("body-parser");
const express = require("express");
const { website, production } = require("../config");
global.db = require("./database/db.js");
const fileUpload = require("express-fileupload");
const passport = require("passport");
const flash = require("express-flash");
const initializePassport = require("./passport-config");
const fs = require("fs");
const cookieSession = require("cookie-session");
const rateLimit = require("express-rate-limit");

module.exports = async () => {
    const app = express();
    const server = http.createServer(app);
    app.set("view engine", "ejs");
    app.set("views", "src/views");

    initializePassport(passport);
    app.use(flash());
    app.use(fileUpload());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cookieSession({
        maxAge: 365 * 24 * 60 * 60 * 1000,
        keys: [website.cookieKey]
    }));
    // app.use(session({
    //     secret: website.secret,
    //     resave: false,
    //     saveUninitialized: false
    // }))
    app.use(passport.initialize());
    app.use(passport.session());

    /* RATE LIMITING */
    const limiter = rateLimit({
        windowMs: 2 * 60 * 1000,
        max: 300,
        message: "429 : Too many requests, please try in 2 minutes."
    });

    /* Private files */
    app.get("/files/admin/:path", checkAdmin, (req, res) => {
        const path = `${__dirname}/public/files/admin/${req.params.path}`;
        const { header, errors } = require(`../public/languages/fr-FR.json`);
        if (fs.existsSync(path)) { 
            res.sendFile(path)
        } else {
            res.render("error.ejs", {
                req, code: 404,
                message: "Ce fichier est introuvable !",
                subMessage: "Il n'existe pas, vérifiez le nom du fichier.",
                lang: "fr-FR", translate: { header, errors },
            });
        }
    });
    /* Public files */
    app.use(express.static("src/public", {
        extensions: ["pdf", "jpg", "jpeg", "png", "webp", "mp4", "gif"],
    }));

    // LOGIN SESSION
    app.post("/login", passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }), (req, res) => {
        const backURL = req.header("Referer") || '/';
        res.redirect(backURL);
    });

    // ROUTERS LOADING
    console.log("\n*"); console.log(" ")
    console.log("\x1b[32m%s\x1b[0m", "(!) General routers loading...");
    const { main, post_main, legal, tools, api_endpoints, sitemap, ads } = require("./routers/index");
    const { logout, post_register, login, register } = require("./routers/login");
    const { api, api_animal_cat, api_animal_dog, api_animal_fox } = require("./routers/api/api");
    const { api_canvas_blur, api_canvas_facepalm, api_canvas_pixelate, api_canvas_grayscale } = require("./routers/api/image-generation");
    sleep(500);

    console.log(" ")
    console.log("\x1b[32m%s\x1b[0m", "(!) Tools system routers loading...");
    const { tools_urlShortener, tools_post_urlShortener, tools_shortURL } = require("./routers/tools/url-shortener")
    const { tools_imageUploader, tools_imageUploader_admin, tools_passwordGenerator, tools_upload, tools_upload_admin } = require("./routers/tools/image-uploader")
    const { tools_ecoleDirecte, tools_edNotes_login, tools_edNotes_logout, tools_edNotes } = require("./routers/tools/ed-notes");
    sleep(500);

    const mainUrl = production ? "antoinemcx.fr" : "localhost:9000";
    const apiUrl = production ? "api.antoinemcx.fr" : "localhost:9000";
    const toolsUrl = production ? "tools.antoinemcx.fr" : "localhost:9000";

    /* Routing */
    app.get('*', async (req, res, next) => {
        let lang = "fr-FR"; // default to french
        if (req.headers["accept-language"]) {
            lang = req.headers["accept-language"].split(",")[0].startsWith("fr")
                ? "fr-FR" : "en-US";
        }

        /* Manage api.antoinemcx.fr subdomain */
        const fullUrl = req.headers.host + req.originalUrl; 
        if (req.headers.host === "api.antoinemcx.fr"
            && ![`${apiUrl}/`, `${apiUrl}/endpoints`, `${apiUrl}/en/endpoints`].includes(fullUrl)) {
            req.url = "/apiSub" + req.url; return next()
        }

        if (fullUrl.startsWith("tools.antoinemcx.fr/url-shortener")
            || fullUrl.startsWith("localhost:9000/url-shortener")) {
            checkFrench(tools_urlShortener, req, res, toolsUrl, "/url-shortener", lang); return;
        } else if (fullUrl.startsWith("tools.antoinemcx.fr/en/url-shortener")
                   || fullUrl.startsWith("localhost:9000/en/url-shortener")) {
            await tools_urlShortener(req, res,"en-US"); return
        } else if (fullUrl !== `${toolsUrl}/ecole-directe/logout`
                   && fullUrl !== `${toolsUrl}/ecole-directe/login`
                   && fullUrl.startsWith(`${toolsUrl}/ecole-directe`)) {
            return await tools_ecoleDirecte(req, res);
        }
        
        switch (fullUrl) {
            case `${mainUrl}/`: checkFrench(main, req, res, mainUrl, '/', lang); break;
            case `${mainUrl}/en/`: await main(req, res, "en-US"); break;
            case `${mainUrl}/login`: checkFrench(login, req, res, mainUrl, "/login", lang); break;
            case `${mainUrl}/en/login`: await login(req, res, "en-US"); break;
            case `${mainUrl}/register`: checkFrench(register, req, res, mainUrl, "/register", lang); break;
            case `${mainUrl}/en/register`: await register(req, res, "en-US"); break;
            case `${mainUrl}/legal`:
            case `${mainUrl}/privacy`:
                checkFrench(legal, req, res, mainUrl, "/legal", lang); break;
            case `${mainUrl}/en/legal`:
            case `${mainUrl}/en/privacy`:
                await legal(req, res, "en-US"); break;
            case `${mainUrl}/logout`: await logout(req, res); break;
            case `${mainUrl}/tools`: checkFrench(tools, req, res, mainUrl, "/tools", lang); break;
            case `${mainUrl}/en/tools`: await tools(req, res, "en-US"); break;
            case "antoinemcx.fr/sitemap.xml": await sitemap(req, res); break;
            case "antoinemcx.fr/robots.txt":
                res.set("Content-Type", "text/plain"); res.send(`Sitemap: https://antoinemcx.fr/sitemap.xml`); break;
            case "antoinemcx.fr/ads.txt": await ads(req, res); break;

            case `${apiUrl}/`: await api(req, res); break;
            case `${apiUrl}/endpoints`: checkFrench(api_endpoints, req, res, apiUrl, "/endpoints", lang); break;
            case `${apiUrl}/en/endpoints`: await api_endpoints(req, res, "en-US"); break;

            case `${toolsUrl}/image-uploader`: 
                checkFrench(tools_imageUploader, req, res, toolsUrl, "/image-uploader", lang); break;
            case `${toolsUrl}/en/image-uploader`: await tools_imageUploader(req, res, "en-US"); break;
            case `${toolsUrl}/password-generator`:
                checkFrench(tools_passwordGenerator, req, res, toolsUrl, "/password-generator", lang); break;
            case `${toolsUrl}/en/password-generator`: await tools_passwordGenerator(req, res, "en-US"); break;
            case `${toolsUrl}/image-uploader/admin`: await tools_imageUploader_admin(req, res); break;
            case `${toolsUrl}/ecole-directe/login`: await tools_edNotes_login(req, res); break;
            case `${toolsUrl}/ecole-directe/logout`: await tools_edNotes_logout(req, res); break;

            case `${toolsUrl}/en/ecole-directe`:
            case `${toolsUrl}/en/image-uploader/admin`:
                const { header, errors } = require(`./public/languages/en-US.json`);
                res.render("error.ejs", {
                    req, code: 404, message: "This page isn't translated !",
                    subMessage: "It exists but not yet in this language.",
                    lang: "en-US", translate: { header, errors }
                }); break;
            
            case `${mainUrl}/discord`:
            case `${mainUrl}/dc`:
            case `${mainUrl}/en/discord`:
                res.redirect(`https://discord.com/invite/G6WQsMQShZ`); break;
            case `${mainUrl}/paypal`: res.redirect(`https://www.paypal.com/paypalme/antoinemcx`); break;
            case `${mainUrl}/en`: res.redirect(`${mainUrl}/en/`); break;
        
            default: await tools_shortURL(req, res); break;
        }
    });
    
    app.get("/apiSub/*", limiter, async (req, res) => {
        const fullUrl = req.headers.host + req.originalUrl;

        if (fullUrl.startsWith("api.antoinemcx.fr/canvas/blur")) {
            return await api_canvas_blur(req, res);
        }
        if (fullUrl.startsWith("api.antoinemcx.fr/canvas/facepalm")) {
            return await api_canvas_facepalm(req, res);
        }
        if (fullUrl.startsWith("api.antoinemcx.fr/canvas/pixelate")) {
            return await api_canvas_pixelate(req, res);
        }
        if (fullUrl.startsWith("api.antoinemcx.fr/canvas/grayscale")) {
            return await api_canvas_grayscale(req, res);
        }

        switch (fullUrl) {
            case "api.antoinemcx.fr/animal/cat": await api_animal_cat(req, res); break;
            case "api.antoinemcx.fr/animal/dog": await api_animal_dog(req, res); break;
            case "api.antoinemcx.fr/animal/fox": await api_animal_fox(req, res); break;
        }
    });

    app.post("*", async (req, res) => {
        const fullUrl = req.headers.host + req.originalUrl;
        if (fullUrl.startsWith(`${toolsUrl}/ecole-directe`)) { return await tools_edNotes(req, res, false); }

        switch (fullUrl) {
            case `${mainUrl}/`: await post_main(req, res); break;
            case `${mainUrl}/register`: await post_register(req, res); break;

            case `${toolsUrl}/upload`: await tools_upload(req, res); break;
            case `${toolsUrl}/en/upload`: await tools_upload(req, res, "en-US"); break;
            case `${toolsUrl}/upload_admin`: await tools_upload_admin(req, res); break;
            case `${toolsUrl}/url-shortener`: await tools_post_urlShortener(req, res); break;
            
            default: res.status(403).json({}); break;
        }
    });

    const listener = server.listen(website.port, "127.0.0.1", function() {
        console.log(' ');
        console.log("\x1b[32m%s\x1b[0m", `(!) App listening on port ${listener.address().port}`);
        console.log(' ');
        sleep(500);
    });
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect("/login")
}
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return res.redirect('/') }
    next()
}
function checkAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.role === "admin") { return next(); }
    }
    const { header, errors } = require(`../public/languages/fr-FR.json`);
    res.render("error.ejs", {
        req, code: 403, message: "Vous n'êtes pas autorisé(e) !",
        subMessage: "Page est réservée aux administrateurs.",
        translate: { header, errors }, lang: "fr-FR"
    })
}

async function checkFrench(page, req, res, urlPrefix, url, lang) {
    if (!lang || lang === "fr-FR") { await page(req, res, lang) }
    else { res.redirect(`https://${urlPrefix}/en${url}`) }
}