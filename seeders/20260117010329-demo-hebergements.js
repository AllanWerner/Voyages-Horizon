'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Hebergements', [
      {
        // Hébergement 1 - Bali
        nom: 'Bali Paradise Resort & Spa',
        type: 'Hôtel',
        categorie: 'Luxe',
        adresse: 'Jl. Raya Uluwatu, Pecatu, Bali 80361, Indonésie',
        nombreEtoiles: 5,
        equipements: 'Piscine à débordement, Spa, 3 restaurants, Club enfants, Salle de sport, Concierge 24h/24',
        prixNuit: 320.00,
        destinationId: 1 
      },
      {
        // Hébergement 2 - Bali
        nom: 'Ubud Eco Lodge',
        type: 'Auberge',
        categorie: 'Confort',
        adresse: 'Jalan Monkey Forest, Ubud, Bali 80571, Indonésie',
        nombreEtoiles: 3,
        equipements: 'Petit-déjeuner bio inclus, Vélo gratuit, Jardin tropical, Restaurant végétarien',
        prixNuit: 85.50,
        destinationId: 1 
      },
      {
        // Hébergement 3 - Paris
        nom: 'Hôtel Le Grand Paris',
        type: 'Hôtel',
        categorie: 'Luxe',
        adresse: '15 Avenue de l\'Opéra, 75001 Paris, France',
        nombreEtoiles: 5,
        equipements: 'Spa Clarins, Restaurant étoilé Michelin, Bar panoramique, Service de limousine',
        prixNuit: 450.00,
        destinationId: 2 
      },
      {
        // Hébergement 4 - Paris
        nom: 'Appartement Montmartre',
        type: 'Appartement',
        categorie: 'Standard',
        adresse: 'Rue Lepic, 75018 Paris, France',
        nombreEtoiles: 0,
        equipements: 'Cuisine équipée, WiFi, Lave-linge, TV écran plat, Terrasse avec vue sur Sacré-Cœur',
        prixNuit: 120.00,
        destinationId: 2 
      },
      {
        // Hébergement 5 - Maldives
        nom: 'Water Villa Maldives',
        type: 'Villa',
        categorie: 'Luxe',
        adresse: 'Baa Atoll, Maldives',
        nombreEtoiles: 5,
        equipements: 'Piscine privée, Accès direct à l\'océan, Plancher de verre, Service de majordome, Spa privé',
        prixNuit: 850.00,
        destinationId: 3 
      },
      {
        // Hébergement 6 - Toscane
        nom: 'Agriturismo Il Borgo',
        type: 'Auberge',
        categorie: 'Confort',
        adresse: 'Strada Chiantigiana, 53011 Castellina in Chianti SI, Italie',
        nombreEtoiles: 4,
        equipements: 'Piscine, Vignoble, Cours de cuisine, Dégustation de vin, Jardin',
        prixNuit: 145.00,
        destinationId: 4 
      },
      {
        // Hébergement 7 - Norvège
        nom: 'Aurora Glass Igloo',
        type: 'Camping',
        categorie: 'Confort',
        adresse: 'Jukkasjärvi, Suède (proche frontière norvégienne)',
        nombreEtoiles: 0,
        equipements: 'Toit de verre pour aurores boréales, Lit chauffant, Sauna, Restaurant de glace',
        prixNuit: 380.00,
        destinationId: 5 
      },
      {
        // Hébergement 8 - Québec
        nom: 'Auberge du Vieux-Port',
        type: 'Auberge',
        categorie: 'Standard',
        adresse: '97 Rue de la Porte, Québec, QC G1K 4G3, Canada',
        nombreEtoiles: 3,
        equipements: 'Restaurant bistronomique, Terrasse couverte, Salle de séjour avec cheminée, WiFi',
        prixNuit: 165.00,
        destinationId: 13 
      },
      {
        // Hébergement 9 - Marrakech
        nom: 'Riad Alhambra',
        type: 'Villa',
        categorie: 'Confort',
        adresse: 'Derb Sidi Bouamer, Médina, Marrakech 40000, Maroc',
        nombreEtoiles: 0,
        equipements: 'Patio central, Piscine traditionnelle, Hammam, Terrasse panoramique, Service de restauration',
        prixNuit: 95.00,
        destinationId: 12 
      }
    ], {});

    console.log('✅ Seeders Hebergements insérés avec succès');
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('Hebergements', null, {});
    
    // Réinitialiser l'auto-increment
    await queryInterface.sequelize.query('ALTER TABLE Hebergements AUTO_INCREMENT = 1');
  }
};