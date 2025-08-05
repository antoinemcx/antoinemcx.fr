const axios = require('axios')

async function getNotes(login, password) {
    try {
        // ___________________________ LOGIN
        const passwd = password.replace(/\%/g, '"%25"').replace(/\&/g, "%26").replace(/\+/g, "%2B").replace(/\\/g, "\\\\").replace(/\"/g, "\\\"")

        const loginRequest = await axios.post("https://api.ecoledirecte.com/v3/login.awp?v=4.27.1",
            "data={\n    \"uuid\": \"\",\n    \"identifiant\": \"" + login + "\",\n    \"motdepasse\": \"" + passwd + "\",\n    \"isReLogin\": false\n}",
            { "headers": {
                "access-control-allow-origin": '*',
                "content-type": "application/x-www-form-urlencoded",
                "x-token": "",
                "Referrer-Policy": "strict-origin-when-cross-origin",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36 RuxitSynthetic/1.0 v6886653584872488035 t8141814394349842256 ath1fb31b7a altpriv cvcv=2 cexpw=1 smf=0"
            }, timeout: 40000
        });
        const loginResponse = loginRequest.data;
        
        if (loginResponse.code === 200) {
            const account = loginResponse.data.accounts[0];
            if (account.typeCompte === "Famille") { throw new Error("Pour l'instant, cet outil ne marche qu'avec un compte élève."); return; }
            else if (account.typeCompte === "E") {

                // ___________________ GETING THE NOTES
                const notesRequest = await axios.post(`https://api.ecoledirecte.com/v3/eleves/${account.id}/notes.awp?verbe=get&v=4.27.1`,
                    "data={\n    \"anneeScolaire\": \"\"\n}",
                    { "headers": {
                        "access-control-allow-origin": '*',
                        "content-type": "application/x-www-form-urlencoded",
                        "x-token": loginResponse.token,
                        "Referrer-Policy": "strict-origin-when-cross-origin",
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36 RuxitSynthetic/1.0 v6886653584872488035 t8141814394349842256 ath1fb31b7a altpriv cvcv=2 cexpw=1 smf=0"
                    }, timeout: 40000}
                );
                const notesResponse = notesRequest.data;

                return {
                    account: {
                        nom: account.nom, prenom: account.prenom, email: account.email, classe: account.profile.classe.libelle
                    },
                    notes: notesResponse.data.notes,
                    periodes: notesResponse.data.periodes
                };
            }
        } else {
            console.log(loginResponse)
            throw new Error("Vos identifiants sont incorrects"); return;
        }

    } catch (err) {
        console.log(err)
        throw new Error(`Identifiants incorrects (si le problème persiste, contactez-moi)`)
    };
};

module.exports = { getNotes };