"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     * 
     * Note: Ce seeder doit être exécuté AVANT le seeder des Voyages
     * car les Voyages ont une clé étrangère vers Destinations.
     */
    
    await queryInterface.bulkInsert("Destinations", [
      {
        // Destination 1 - Bali
        nom: "Bali",
        pays: "Indonésie",
        continent: "Asie",
        description: "Île paradisiaque indonésienne célèbre pour ses rizières en terrasses, temples hindous et plages de sable blanc.",
        climat: "Tropical",
        meilleurePeriode: "Avril à Octobre (saison sèche)",
        langues: "Indonésien, Balinais",
        monnaie: "Roupie",
        isActive: true
      },
      {
        // Destination 2 - Paris
        nom: "Paris",
        pays: "France",
        continent: "Europe",
        description: "Capitale de la France, surnommée la Ville Lumière.",
        climat: "Tempéré",
        meilleurePeriode: "Avril à Juin et Septembre à Octobre",
        langues: "Français",
        monnaie: "Euro",
        isActive: true
      },
      {
        // Destination 3 - Maldives
        nom: "Maldives",
        pays: "Maldives",
        continent: "Asie",
        description: "Paradis pour la plongée sous-marine avec ses récifs coralliens, ses eaux turquoise et ses resorts sur pilotis.",
        climat: "Tropical",
        meilleurePeriode: "Novembre à Avril",
        langues: "Divehi",
        monnaie: "Rufiyaa",
        isActive: true
      },
      {
        // Destination 4 - Toscane
        nom: "Toscane",
        pays: "Italie",
        continent: "Europe",
        description: "Région du centre de l\'Italie célèbre pour ses paysages de collines, son vin (Chianti), son huile d'olive et ses villes historiques comme Florence, Sienne et Pise.",
        climat: "Tempéré",
        meilleurePeriode: "Mai à Juin et Septembre à Octobre",
        langues: "Italien",
        monnaie: "Euro",
        isActive: true
      },
      {
        // Destination 5 - Norvège
        nom: "Norvège",
        pays: "Norvège",
        continent: "Europe",
        description: "Pays scandinave renommé pour ses fjords spectaculaires, ses aurores boréales, ses villages de pêcheurs colorés et sa culture viking.",
        climat: "Tempéré",
        meilleurePeriode: "Juin à Août (été), Septembre à Mars",
        langues: "Norvégien",
        monnaie: "Couronne",
        isActive: true
      },
      {
        // Destination 6 - Népal
        nom: "Népal",
        pays: "Népal",
        continent: "Asie",
        description: "Berceau du bouddhisme et destination incontournable pour le trekking.",
        climat: "Montagnard",
        meilleurePeriode: "Octobre à Novembre et Mars à Avril",
        langues: "Népalais",
        monnaie: "Roupie",
        isActive: true
      },
      {
        // Destination 7 - Tokyo
        nom: "Tokyo",
        pays: "Japon",
        continent: "Asie",
        description: "Métropole futuriste mêlant gratte-ciel high-tech, temples anciens, jardins paisibles et une cuisine raffinée.",
        climat: "Tempéré",
        meilleurePeriode: "Mars à Mai et Septembre à Novembre",
        langues: "Japonais",
        monnaie: "Yen",
        isActive: true
      },
      {
        // Destination 8 - Bordeaux
        nom: "Bordeaux",
        pays: "France",
        continent: "Europe",
        description: "Capitale mondiale du vin, célèbre pour ses châteaux viticoles et sa gastronomie raffinée.",
        climat: "Tempéré",
        meilleurePeriode: "Mai à Octobre",
        langues: "Français",
        monnaie: "Euro",
        isActive: true
      },
      {
        // Destination 9 - Costa Rica
        nom: "Costa Rica",
        pays: "Costa Rica",
        continent: "Amérique",
        description: "Destination idéale pour observer la biodiversité, surfer et se détendre dans des sources chaudes volcaniques.",
        climat: "Tropical",
        meilleurePeriode: "Décembre à Avril",
        langues: "Espagnol",
        monnaie: "Colón",
        isActive: true
      },
      {
        // Destination 10 - Santorini
        nom: "Santorini",
        pays: "Grèce",
        continent: "Europe",
        description: "Île volcanique des Cyclades célèbre pour ses couchers de soleil spectaculaires et ses plages de sable noir.",
        climat: "Tempéré",
        meilleurePeriode: "Mai à Juin et Septembre à Octobre",
        langues: "Grec",
        monnaie: "Euro",
        isActive: true
      },
      {
        // Destination 11 - Nouvelle-Zélande
        nom: "Nouvelle-Zélande",
        pays: "Nouvelle-Zélande",
        continent: "Océanie",
        description: " Terre d'aventure pour le ski, le saut à l'élastique, la randonnée et le tournage du Seigneur des Anneaux.",
        climat: "Tempéré",
        meilleurePeriode: "Décembre à Février (été)",
        langues: "Anglais, Maori",
        monnaie: "Dollar",
        isActive: true
      },
      {
        // Destination 12 - Marrakech
        nom: "Marrakech",
        pays: "Maroc",
        continent: "Afrique",
        description: "Ville impériale au pied des montagnes de l'Atlas.",
        climat: "Désertique",
        meilleurePeriode: "Mars à Mai et Septembre à Novembre",
        langues: "Arabe, Français",
        monnaie: "Dirham",
        isActive: true
      },
      {
        // Destination 13 - Québec (exemple supplémentaire)
        nom: "Québec",
        pays: "Canada",
        continent: "Amérique",
        description: "Province francophone du Canada célèbre pour son carnaval d'hiver et sa capitale fortifiée, la ville de Québec.",
        climat: "Tempéré",
        meilleurePeriode: "Juin à Septembre et Décembre à Mars",
        langues: "Français, Anglais",
        monnaie: "Dollar",
        isActive: true
      },
      {
        // Destination 14 - Kenya (exemple supplémentaire)
        nom: "Kenya",
        pays: "Kenya",
        continent: "Afrique",
        description: "Destination de safari par excellence avec le Masai Mara, l'Amboseli et le lac Nakuru.",
        climat: "Tropical",
        meilleurePeriode: "Janvier à Février et Juillet à Octobre ",
        langues: "Swahili, Anglais",
        monnaie: "Shilling",
        isActive: true
      },
      {
        // Destination 15 - Sydney (exemple supplémentaire)
        nom: "Sydney",
        pays: "Australie",
        continent: "Océanie",
        description: "Ville emblématique avec son opéra en forme de voiles et son ambiance décontractée.",
        climat: "Tempéré",
        meilleurePeriode: "Septembre à Novembre et Mars à Mai",
        langues: "Anglais",
        monnaie: "Dollar",
        isActive: true
      }
    ], {});

    console.log("✅ Seeders Destinations insérés avec succès");
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete("Destinations", null, {});
    
    // Réinitialiser l"auto-increment
    await queryInterface.sequelize.query("ALTER TABLE Destinations AUTO_INCREMENT = 1");
  }
};