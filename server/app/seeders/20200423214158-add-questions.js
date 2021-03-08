module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface
    .bulkInsert('questions', [
      {
        id: 1,
        quizId: 1,
        imageId: null,
        label: 'Lequel n\'est pas un mammifère ?',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        quizId: 1,
        imageId: null,
        label: 'Lequel est un caractère propre aux mammifères ?',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        label: 'Lequel n\'est pas carnivore ?',
        quizId: 1,
        imageId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        quizId: 1,
        imageId: null,
        label: 'Quel mammifère marin est considéré comme le plus grand au monde ?',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        quizId: 1,
        imageId: null,
        label: 'Qui chasse dans un groupe de lions ?',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        quizId: 1,
        imageId: null,
        label: 'Lequels de ces animaux n\'est pas un rongeur ?',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        quizId: 1,
        imageId: null,
        label: 'Quel est le mammifère terrestre le plus rapide au monde ?',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        quizId: 1,
        imageId: null,
        label: 'Quel mammifère a la durée de gestation la plus longue ?',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        quizId: 1,
        imageId: null,
        label: 'Quel est le nom commun de Vulpes vulpes ?',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        quizId: 1,
        imageId: null,
        label: 'Lequel de ces mammifères s\'est éteint ?',
        createdAt: new Date(),
        updatedAt: new Date()
      }],
    {})
    .then(() => queryInterface.sequelize.query('ALTER SEQUENCE "questions_id_seq" RESTART WITH 11')),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('questions', null, {})
};
