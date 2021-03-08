module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface
    .bulkInsert('guests', [
      {
        id: 1,
        firstName: 'Gérard',
        lastName: 'Martin',
        accessibility: 'none',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        firstName: 'Françoise',
        lastName: 'Dupont',
        accessibility: 'agrandissement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        firstName: 'Jean-François',
        lastName: 'Deschamps',
        accessibility: 'contraste eleve',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        firstName: 'Jaqueline',
        lastName: 'Dubois',
        accessibility: 'none',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        firstName: 'Juliette',
        lastName: 'Després',
        accessibility: 'none',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        firstName: 'Michel',
        lastName: 'Clément',
        accessibility: 'none',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        firstName: 'Pierre',
        lastName: 'Roche',
        accessibility: 'none',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        firstName: 'Antoine',
        lastName: 'Labelle',
        accessibility: 'none',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {})
    .then(() => queryInterface.sequelize.query('ALTER SEQUENCE "guests_id_seq" RESTART WITH 9')),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('guests', null, {})
};
