# Voyages Horizon API

API REST complète pour la gestion d'une agence de voyages développée avec Node.js, Express et Sequelize.

## Description

Voyages Horizon est une API REST qui permet de gérer l'ensemble des opérations d'une agence de voyages : destinations, circuits, clients, réservations, hébergements et activités touristiques.

## Fonctionnalités

- Gestion des clients avec préférences de voyage
- Catalogue de destinations mondiales
- Création et gestion de circuits de voyage
- Système de réservation avec gestion des places
- Base de données d'hébergements et d'activités
- Filtres et recherches avancés
- Relations complexes entre entités (1:N et N:M)

## Technologies

- Node.js v18+
- Express.js v4.18
- Sequelize v6.35 (ORM)
- MariaDB v10.11+ / MySQL v8.0+
- Sequelize CLI

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- Node.js (version 18 ou supérieure)
- MariaDB ou MySQL
- npm ou yarn
- Git

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/AllanWerner/Voyages-Horizon.git
cd Voyages-Horizon
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer la base de données

Créez la base de données :

```sql
CREATE DATABASE voyages_horizon_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Modifiez le fichier `config/config.json` avec vos identifiants :

```json
{
  "development": {
    "username": "root",
    "password": "votre_mot_de_passe",
    "database": "voyages_horizon_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### 4. Exécuter les migrations

```bash
npm run db:migrate
```

### 5. (Optionnel) Peupler avec des données de test

```bash
npm run db:seed
```

### 6. Démarrer le serveur

```bash
npm run dev
```

Le serveur démarre sur http://localhost:3000

## Structure du projet

```
voyages-api/
├── config/
│   └── config.json
├── migrations/
├── models/
│   ├── client.js
│   ├── destination.js
│   ├── voyage.js
│   ├── hebergement.js
│   ├── activite.js
│   ├── reservation.js
│   └── voyageactivite.js
├── routes/
│   ├── clients.js
│   ├── destinations.js
│   ├── voyages.js
│   ├── reservations.js
│   ├── hebergements.js
│   └── activites.js
├── seeders/
├── server.js
└── package.json
```

## Scripts disponibles

```bash
npm start          # Démarrer en production
npm run dev        # Démarrer en développement (nodemon)
npm run db:create  # Créer la base de données
npm run db:migrate # Exécuter les migrations
npm run db:seed    # Insérer les données de test
```

## Documentation API

### URL de base

```
http://localhost:3000/api
```

### Endpoints

#### Clients

```
POST   /api/clients              Créer un client
GET    /api/clients              Lister les clients (pagination)
GET    /api/clients/:id          Détails d'un client
PUT    /api/clients/:id          Mettre à jour un client
DELETE /api/clients/:id          Supprimer un client
```

#### Destinations

```
POST   /api/destinations                    Créer une destination
GET    /api/destinations                    Lister les destinations
GET    /api/destinations/:id                Détails complets (voyages, hébergements, activités)
GET    /api/destinations/:id/voyages        Voyages d'une destination
GET    /api/destinations/continent/:nom     Destinations par continent
```

#### Voyages

```
POST   /api/voyages                  Créer un voyage
GET    /api/voyages                  Lister avec filtres (date, prix, type, destination)
GET    /api/voyages/:id              Détails d'un voyage
POST   /api/voyages/:id/reserver     Réserver un voyage
GET    /api/voyages/filter/prochains Voyages des 30 prochains jours
POST   /api/voyages/:id/activites    Ajouter une activité
```

#### Réservations

```
POST   /api/reservations                      Créer une réservation
GET    /api/reservations/client/:clientId     Réservations d'un client
GET    /api/reservations/voyage/:voyageId     Réservations d'un voyage
PUT    /api/reservations/:id/annuler          Annuler une réservation
```

#### Hébergements

```
POST   /api/hebergements    Créer un hébergement
GET    /api/hebergements    Lister (filtres: type, catégorie, destination)
```

#### Activités

```
POST   /api/activites    Créer une activité
GET    /api/activites    Lister (filtres: type, destination)
```

## Exemples de requêtes

### Créer un client

```bash
curl -X POST http://localhost:3000/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean.dupont@email.com",
    "telephone": "0612345678",
    "ville": "Paris",
    "pays": "France"
  }'
```

### Créer une destination

```bash
curl -X POST http://localhost:3000/api/destinations \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Tokyo",
    "pays": "Japon",
    "continent": "Asie",
    "climat": "Tempéré",
    "langues": "Japonais",
    "monnaie": "Yen (JPY)"
  }'
```

### Créer un voyage

```bash
curl -X POST http://localhost:3000/api/voyages \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Découverte du Japon",
    "dateDepart": "2026-04-01",
    "dateRetour": "2026-04-15",
    "dureeJours": 15,
    "prixBase": 2500.00,
    "placesDisponibles": 20,
    "typeVoyage": "Culturel",
    "destinationId": 1
  }'
```

### Réserver un voyage

```bash
curl -X POST http://localhost:3000/api/voyages/1/reserver \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": 1,
    "nombrePersonnes": 2
  }'
```

### Lister les voyages avec filtres

Par prix :
```bash
curl "http://localhost:3000/api/voyages?prixMin=1000&prixMax=3000"
```

Par date :
```bash
curl "http://localhost:3000/api/voyages?dateMin=2026-03-01&dateMax=2026-06-30"
```

Par type :
```bash
curl "http://localhost:3000/api/voyages?typeVoyage=Culturel"
```

Voyages prochains :
```bash
curl "http://localhost:3000/api/voyages/filter/prochains"
```

### Annuler une réservation

```bash
curl -X PUT http://localhost:3000/api/reservations/1/annuler
```

## Modèle de données

Le projet utilise les entités suivantes avec leurs relations :

**Client** (informations personnelles, préférences)
- Relation N:M avec Voyage via Reservation

**Destination** (pays, continent, climat, informations culturelles)
- Relation 1:N avec Voyage
- Relation 1:N avec Hebergement
- Relation 1:N avec Activite

**Voyage** (titre, dates, prix, places disponibles)
- Relation N:1 avec Destination
- Relation N:M avec Client via Reservation
- Relation N:M avec Activite via VoyageActivite

**Hebergement** (nom, type, catégorie, étoiles, prix par nuit)
- Relation N:1 avec Destination

**Activite** (nom, type, durée, prix, niveau physique)
- Relation N:1 avec Destination
- Relation N:M avec Voyage via VoyageActivite

**Reservation** (table de jonction Client-Voyage)
- Stocke nombre de personnes, prix total, statut

**VoyageActivite** (table de jonction Voyage-Activite)
- Stocke jour, ordre, inclusion dans le prix

## Codes de réponse HTTP

```
200 OK                  Requête réussie
201 Created             Ressource créée
400 Bad Request         Erreur de validation
404 Not Found           Ressource non trouvée
409 Conflict            Conflit (ex: email existant)
500 Internal Error      Erreur serveur
```

## Tests

### Scénario 1 : Circuit complet

1. Créer une destination "Japon"
2. Créer un voyage "Découverte du Japon" (15 jours, 2500€)
3. Créer un hébergement "Hôtel Sakura" (4 étoiles)
4. Créer des activités "Visite Tokyo", "Mont Fuji"
5. Associer les activités au voyage
6. Créer un client "Dupont Jean"
7. Réserver le voyage pour 2 personnes
8. Vérifier le prix total (2500 × 2 = 5000€)

### Scénario 2 : Gestion des disponibilités

1. Créer un voyage avec 5 places disponibles
2. Réserver pour 3 personnes → reste 2 places
3. Réserver pour 3 personnes → doit échouer
4. Annuler une réservation → places re-disponibles

### Scénario 3 : Recherches complexes

1. Tous les voyages en Asie pour moins de 3000€
2. Toutes les destinations avec hébergement 5 étoiles
3. Les activités sportives en Europe
4. Les voyages culturels dans les 3 prochains mois

## Contribution

Les contributions sont les bienvenues. Pour contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit les changements (`git commit -m 'Ajout fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## Bonnes pratiques

- Utiliser des noms cohérents pour les variables
- Ajouter des index sur les colonnes fréquemment recherchées
- Implémenter la pagination pour les listes
- Gérer proprement les erreurs 404 et 500
- Valider les données avant insertion
- Ne jamais exposer les identifiants de base de données

## Licence

Ce projet est sous licence MIT.

## Auteur

Allan Werner - https://github.com/AllanWerner

## Ressources

- Documentation Sequelize : https://sequelize.org/docs/v6/
- Guide Express.js : https://expressjs.com/
- Documentation MariaDB : https://mariadb.com/kb/en/

