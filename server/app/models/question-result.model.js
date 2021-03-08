module.exports = (sequelize, DataTypes) => {
  // Define the question result model.
  const QuestionResult = sequelize.define('QuestionResult', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    skipped: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    tableName: 'question_results'
  });

  // Define the result associations.
  QuestionResult.associate = (models) => {
    // A question result belongs to a result.
    QuestionResult.belongsTo(models.Result, {
      foreignKey: {
        name: 'resultId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // A question result belongs to a question.
    QuestionResult.belongsTo(models.Question, {
      foreignKey: {
        name: 'questionId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // A question result has many answer results.
    QuestionResult.hasMany(models.AnswerResult, {
      as: 'answers',
      foreignKey: 'questionResultId'
    });
  };

  return QuestionResult;
};
