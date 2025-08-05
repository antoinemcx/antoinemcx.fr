const fs = require('fs');
console.log("     * General API endpoints loaded")

async function api(req, res) {
    console.log()
    res.json({
        status: true,
        hello: 'world',
    });
};

async function api_animal_cat(req, res) {
    const image_dir = './src/public/img/api/cats';

    try {
        fs.readdir(image_dir, (err, files) => { 
            const random_index = Math.floor(Math.random() * (files.length - 1 + 1) + 1);
            const selected_image = `https://antoinemcx.fr/img/api/cats/${random_index}.jpg`
        
            res.json({ status: true, image: selected_image })
        })
    } catch(e) { res.json({status: false}) }
}

async function api_animal_dog(req, res) {
    const image_dir = './src/public/img/api/dogs';

    try {
        fs.readdir(image_dir, (err, files) => { 
            const random_index = Math.floor(Math.random() * (files.length - 1 + 1) + 1);
            const selected_image = `https://antoinemcx.fr/img/api/dogs/${random_index}.jpg`
        
            res.json({ status: true, image: selected_image })
        })
    } catch(e) { res.json({status: false}) }
};

async function api_animal_fox(req, res) {
    const image_dir = './src/public/img/api/foxes';

    try {
        fs.readdir(image_dir, (err, files) => { 
            const random_index = Math.floor(Math.random() * (files.length - 1 + 1) + 1);
            const selected_image = `https://antoinemcx.fr/img/api/foxes/${random_index}.jpg`
        
            res.json({ status: true, image: selected_image })
        })
    } catch(e) { res.json({status: false}) }
};

module.exports = { api, api_animal_cat, api_animal_dog, api_animal_fox };