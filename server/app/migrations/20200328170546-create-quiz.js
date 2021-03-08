module.exports = {
  // Create the quizzes table.
  up: (queryInterface, Sequelize) => queryInterface.createTable('quizzes', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    themeId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'themes',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false
    },
    imageId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'images',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true
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
  // Drop the quizzes table.
  down: (queryInterface) => queryInterface.dropTable('quizzes')
};
