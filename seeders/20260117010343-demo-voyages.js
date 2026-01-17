"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert("Voyages", [
      {
        // Voyage 1 - Aventure à Bali
        titre: "Aventure Tropicale à Bali",
        description: "Découverte des rizières, temples et plages de Bali avec activités sportives",
        dateDepart: "2024-04-15",
        dateRetour: "2024-04-25",
        dureeJours: 11,
        prixBase: 1250.50,
        placesDisponibles: 15,
        niveauDifficulte: "Modéré",
        typeVoyage: "Aventure",
        destinationId: 1
      },
      {
        // Voyage 2 - Culturel à Paris
        titre: "Culture et Art à Paris",
        description: "Visite des musées, monuments historiques et découverte de la gastronomie française",
        dateDepart: "2024-05-10",
        dateRetour: "2024-05-17",
        dureeJours: 8,
        prixBase: 890.00,
        placesDisponibles: 20,
        niveauDifficulte: "Facile",
        typeVoyage: "Culturel",
        destinationId: 2
      },
      {
        // Voyage 3 - Balnéaire aux Maldives
        titre: "Séjour Paradisiaque aux Maldives",
        description: "Relaxation sur des plages de sable blanc et plongée dans les eaux turquoise",
        dateDepart: "2024-06-01",
        dateRetour: "2024-06-10",
        dureeJours: 10,
        prixBase: 2200.75,
        placesDisponibles: 12,
        niveauDifficulte: "Facile",
        typeVoyage: "Balnéaire",
        destinationId: 3
      },
      {
        // Voyage 4 - Gastronomique en Italie
        titre: "Tour Gastronomique en Toscane",
        description: "Dégustation de vins, cours de cuisine italienne et visite de vignobles",
        dateDepart: "2024-07-05",
        dateRetour: "2024-07-12",
        dureeJours: 8,
        prixBase: 1450.00,
        placesDisponibles: 10,
        niveauDifficulte: "Facile",
        typeVoyage: "Gastronomique",
        destinationId: 4
      },
      {
        // Voyage 5 - Ecotourisme en Norvège
        titre: "Aventure Écologique en Norvège",
        description: "Observation des aurores boréales, randonnées et découverte de la faune arctique",
        dateDepart: "2024-09-15",
        dateRetour: "2024-09-25",
        dureeJours: 11,
        prixBase: 1850.25,
        placesDisponibles: 8,
        niveauDifficulte: "Difficile",
        typeVoyage: "Ecotourisme",
        destinationId: 5
      },
      {
        // Voyage 6 - Aventure au Népal
        titre: "Trek dans l\"Himalaya",
        description: "Randonnée jusqu\"au camp de base de l\"Everest avec guide sherpa",
        dateDepart: "2024-10-01",
        dateRetour: "2024-10-20",
        dureeJours: 20,
        prixBase: 3100.00,
        placesDisponibles: 6,
        niveauDifficulte: "Expert",
        typeVoyage: "Aventure",
        destinationId: 6
      },
      {
        // Voyage 7 - Culturel au Japon
        titre: "Immersion Culturelle au Japon",
        description: "Visite de temples, expérience de cérémonie du thé et découverte de Tokyo",
        dateDepart: "2024-11-05",
        dateRetour: "2024-11-18",
        dureeJours: 14,
        prixBase: 2650.50,
        placesDisponibles: 18,
        niveauDifficulte: "Modéré",
        typeVoyage: "Culturel",
        destinationId: 7
      },
      {
        // Voyage 8 - Gastronomique en France
        titre: "Route des Vins de Bordeaux",
        description: "Visite de châteaux viticoles et dégustation des meilleurs crus de Bordeaux",
        dateDepart: "2024-08-12",
        dateRetour: "2024-08-19",
        dureeJours: 8,
        prixBase: 1200.00,
        placesDisponibles: 14,
        niveauDifficulte: "Facile",
        typeVoyage: "Gastronomique",
        destinationId: 8
      },
      {
        // Voyage 9 - Aventure au Costa Rica
        titre: "Biodiversité du Costa Rica",
        description: "Observation de la faune, visite de parcs nationaux et activités en pleine nature",
        dateDepart: "2024-12-03",
        dateRetour: "2024-12-15",
        dureeJours: 13,
        prixBase: 1750.00,
        placesDisponibles: 16,
        niveauDifficulte: "Modéré",
        typeVoyage: "Ecotourisme",
        destinationId: 9
      },
      {
        // Voyage 10 - Balnéaire en Grèce
        titre: "Croisière dans les Cyclades",
        description: "Navigation entre les îles grecques avec visites archéologiques et baignades",
        dateDepart: "2024-07-20",
        dateRetour: "2024-07-30",
        dureeJours: 11,
        prixBase: 1550.75,
        placesDisponibles: 25,
        niveauDifficulte: "Facile",
        typeVoyage: "Balnéaire",
        destinationId: 10
      },
      {
        // Voyage 11 - Aventure en Nouvelle-Zélande
        titre: "Road Trip en Nouvelle-Zélande",
        description: "Route panoramique, sports extrêmes et découverte des paysages du Seigneur des Anneaux",
        dateDepart: "2025-01-10",
        dateRetour: "2025-01-25",
        dureeJours: 16,
        prixBase: 2950.00,
        placesDisponibles: 12,
        niveauDifficulte: "Difficile",
        typeVoyage: "Aventure",
        destinationId: 11
      },
      {
        // Voyage 12 - Culturel au Maroc
        titre: "Désert et Médinas du Maroc",
        description: "Nuit dans le désert, visite des souks et découverte de l\"artisanat marocain",
        dateDepart: "2024-10-15",
        dateRetour: "2024-10-25",
        dureeJours: 11,
        prixBase: 980.00,
        placesDisponibles: 22,
        niveauDifficulte: "Modéré",
        typeVoyage: "Culturel",
        destinationId: 12
      }
    ], {});

    console.log("✅ Seeders Voyages insérés avec succès");
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete("Voyages", null, {});
    
    // Réinitialiser l"auto-increment
    await queryInterface.sequelize.query("ALTER TABLE Voyages AUTO_INCREMENT = 1");
  }
};