module.exports = {
  // Create the results table.
  up: (queryInterface, Sequelize) => queryInterface.createTable('results', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    guestId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'guests',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false
    },
    quizId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'quizzes',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false
    },
    timedOut: {
      type: Sequelize.BOOLEAN,
      allowNull: false
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
  // Drop the results table.
  down: (queryInterface) => queryInterface.dropTable('results')
};
