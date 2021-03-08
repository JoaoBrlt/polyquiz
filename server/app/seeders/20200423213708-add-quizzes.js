module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface
    .bulkInsert('quizzes', [
      {
        id: 1,
        themeId: 1,
        imageId: 36,
        name: 'Mammifères',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {})
    .then(() => queryInterface.sequelize.query('ALTER SEQUENCE "quizzes_id_seq" RESTART WITH 2')),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('quizzes', null, {})
};
