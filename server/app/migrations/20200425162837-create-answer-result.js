module.exports = {
  // Create the answer_results table.
  up: (queryInterface, Sequelize) => queryInterface
    .createTable('answer_results', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      questionResultId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'question_results',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      answerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'answers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }),
  // Drop the answer_results table.
  down: (queryInterface) => queryInterface.dropTable('answer_results')
};
