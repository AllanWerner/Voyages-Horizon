# Voyages-Horizon
API REST pour Système de gestion de clients, d'offre de voyages et de réservations 

1- Création de la structure du projet et Installation des dépendances 
  + mkdir VoyagesHorizon
  + cd VoyagesHorizon
    // Initialisation du projet
  + npm init -y
  + npm i express mariadb sequelize // Installation des dépendances 
  + npm i -g sequelize-cli
  + npm i -D nodemon
  + code . // pour ouvrir le dossier dans l'éditeur de code
    // Structure du projet
  + npx sequelize-cli init
  + mkdir controllers
  + mkdir routes
  + mkdir middleware
    // Préparation de l'environnement de dev
  + édition du config.json
  + édition du server.js (Structure de base)
  + Création du conteneur pour la base de données
      docker run --name DBHorizon -d -p 3306:3306 -e MARIADB_ROOT_PASSWORD=***** -e MARIADB_DATABASE=DBHorizon mariadb:10.11
  +
