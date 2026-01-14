const express = require('express');
const db = require("./models");

const app = express();

const port = 7777;

app.use(express.json());

// Connexion à la base de données

db.sequelize.authenticate()
    .then(() => console.log("Connexion à la BD réussie ✅"))
    .catch(err => console.error({message : "Echec de connexion à la BD:", err}))


// Lancement du serveur 
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);   
})