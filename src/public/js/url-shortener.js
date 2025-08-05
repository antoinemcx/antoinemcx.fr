$('.shortener-form').submit(function(e) {
    e.preventDefault();
    shorten();
});

const shorten = async function () {
    const longURL = $("input:text").val();
    if (longURL.length < 3 || longURL.length > 2500) { console.log('e'); window.location.href = "?error=URL invalide"; return }
    if (urlValide(longURL) === false) { window.location.href = "?error=URL invalide"; return };
    const shortURL = generateURL();

    fetch(`https://tools.antoinemcx.fr/url-shortener`, {
        method: "POST",
        body: JSON.stringify({ longURL: longURL, shortURL: shortURL }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).catch(e => { console.log(e); window.location.href = "?error=Une erreur est survenue" })
    .then(newLink(longURL, shortURL))
}

function generateURL() {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 7; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }

    var res = result.join('');
    // db.query(`SELECT * FROM urlShortener WHERE short = "${res}"`).then(rows => { if (rows[0] !== undefined) { generateURL() } });

    return res;
}

function urlValide(url) {
    var regexp = new RegExp("^((http|https)://){1}(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-|/|=|?)?]+)+$");
    return regexp.test(url);
}

function newLink(long, short) {
    $('.div').html(`
        ${$('.div').html()}
        <div class="mt-4 w-100 linkUrl linkPreview" style="justify-content: space-between">
            <div syle="max-width: 250px; overflow: hidden">${long.substr(0, 35)+'...'}</div>
            <div><a href="https://antoinemcx.fr/${short}" target="_blank">https://antoinemcx.fr/${short}</a></div>
            <div onclick="navigator.clipboard.writeText('https://antoinemcx.fr/${short}')" class="copy-button">Copier</div>
        </div>

        <script>$('input:text').prop('disabled', true); $('input:text').css('cursor', 'not-allowed'); $('.submit-button').removeAttr('onclick');</script>
        <style>.copy-button { cursor: pointer; font-weight: bold; } .submit-button { cursor: not-allowed; }</style>
    `)
}