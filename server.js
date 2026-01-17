const express = require('express');
const db = require("./models");
const errorHandler = require('./middlewares/errorHandler');

// Import des routes
const clientsRoutes = require('./routes/clientRoutes')
const destinationRoutes = require('./routes/destinationRoutes');
const voyageRoutes = require('./routes/voyageRoutes');
const reservationRoutes = require('./routes/reservationRoutes');


const app = express();

const port = 7777;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à la base de données

db.sequelize.authenticate()
    .then(() => console.log("Connexion à la BD réussie ✅"))
    .catch(err => console.error({message : "Echec de connexion à la BD:", err}))


// Route de base
app.get('/', (req, res) => {
  res.json({
    message: 'API de voyage',
    status: 'en ligne',
    timestamp: new Date().toISOString()
  });
});

// Routes API
app.use('/api/clients', clientsRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/voyages', voyageRoutes);
app.use('/api/reservations', reservationRoutes);



// Gestionnaire d'erreurs global
app.use(errorHandler);

// Lancement du serveur 
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);   
})