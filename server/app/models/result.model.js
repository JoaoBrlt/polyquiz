module.exports = (sequelize, DataTypes) => {
  // Define the result model.
  const Result = sequelize.define('Result', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    timedOut: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    tableName: 'results'
  });

  // Define the result associations.
  Result.associate = (models) => {
    // A result belongs to a guest.
    Result.belongsTo(models.Guest, {
      foreignKey: {
        name: 'guestId',
        allowNull: false
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // A result belongs to a quiz.
    Result.belongsTo(models.Quiz, {
      foreignKey: {
        name: 'quizId',
        allowNull: false
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // A result has many question results.
    Result.hasMany(models.QuestionResult, {
      as: 'questions',
      foreignKey: 'resultId'
    });
  };

  return Result;
};
