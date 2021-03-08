module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface
    .bulkInsert('answers', [
      {
        id: 1,
        quizId: 1,
        questionId: 1,
        imageId: 1,
        value: 'Dauphin',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        quizId: 1,
        questionId: 1,
        imageId: 2,
        value: 'Lapin',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        quizId: 1,
        questionId: 1,
        imageId: 3,
        value: 'Ornithorynque',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        quizId: 1,
        questionId: 1,
        imageId: 4,
        value: 'Requin',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        quizId: 1,
        questionId: 2,
        imageId: 5,
        value: 'Dents',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        quizId: 1,
        questionId: 2,
        imageId: 6,
        value: 'Branchies',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        quizId: 1,
        questionId: 2,
        imageId: 7,
        value: 'Quatre membres',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        quizId: 1,
        questionId: 2,
        imageId: 8,
        value: 'Allaitement',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        quizId: 1,
        questionId: 3,
        imageId: 9,
        value: 'Lamantin',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        quizId: 1,
        questionId: 3,
        imageId: 10,
        value: 'Balaine bleue',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        quizId: 1,
        questionId: 3,
        imageId: 11,
        value: 'Chèvre',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        quizId: 1,
        questionId: 3,
        imageId: 12,
        value: 'Lion',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        quizId: 1,
        questionId: 4,
        imageId: 1,
        value: 'Dauphin',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        quizId: 1,
        questionId: 4,
        imageId: 10,
        value: 'Balaine bleue',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        quizId: 1,
        questionId: 4,
        imageId: 13,
        value: 'Orque',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        quizId: 1,
        questionId: 4,
        imageId: 14,
        value: 'Otarie',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        quizId: 1,
        questionId: 5,
        imageId: 12,
        value: 'Un mâle',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        quizId: 1,
        questionId: 5,
        imageId: 15,
        value: 'Une femelle',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 19,
        quizId: 1,
        questionId: 5,
        imageId: 16,
        value: 'Les femelles',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        quizId: 1,
        questionId: 5,
        imageId: 17,
        value: 'Les lionceaux',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 21,
        quizId: 1,
        questionId: 6,
        imageId: 2,
        value: 'Lapin',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 22,
        quizId: 1,
        questionId: 6,
        imageId: 18,
        value: 'Cochon d\'inde',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 23,
        quizId: 1,
        questionId: 6,
        imageId: 19,
        value: 'Écureuil',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 24,
        quizId: 1,
        questionId: 6,
        imageId: 20,
        value: 'Rat',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 25,
        quizId: 1,
        questionId: 7,
        imageId: 21,
        value: 'Tigre',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 26,
        quizId: 1,
        questionId: 7,
        imageId: 22,
        value: 'Léopard',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 27,
        quizId: 1,
        questionId: 7,
        imageId: 23,
        value: 'Guépard',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 28,
        quizId: 1,
        questionId: 7,
        imageId: 24,
        value: 'Jaguar',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 29,
        quizId: 1,
        questionId: 8,
        imageId: 25,
        value: 'Éléphant',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 30,
        quizId: 1,
        questionId: 8,
        imageId: 10,
        value: 'Balaine bleue',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 31,
        quizId: 1,
        questionId: 8,
        imageId: 26,
        value: 'Hippopotame',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 32,
        quizId: 1,
        questionId: 8,
        imageId: 27,
        value: 'Girafe',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 33,
        quizId: 1,
        questionId: 9,
        imageId: 28,
        value: 'Veau',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 34,
        quizId: 1,
        questionId: 9,
        imageId: 29,
        value: 'Renard',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 35,
        quizId: 1,
        questionId: 9,
        imageId: 30,
        value: 'Chien',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 36,
        quizId: 1,
        questionId: 9,
        imageId: 31,
        value: 'Loup',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 37,
        quizId: 1,
        questionId: 10,
        imageId: 25,
        value: 'Éléphant',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 38,
        quizId: 1,
        questionId: 10,
        imageId: 32,
        value: 'Koala',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 39,
        quizId: 1,
        questionId: 10,
        imageId: 33,
        value: 'Dauphin rose',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 40,
        quizId: 1,
        questionId: 10,
        imageId: 34,
        value: 'Rhinocéros blanc',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {})
    .then(() => queryInterface.sequelize.query('ALTER SEQUENCE "answers_id_seq" RESTART WITH 41')),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('answers', null, {})
};
