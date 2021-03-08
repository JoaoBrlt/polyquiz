module.exports = (sequelize, DataTypes) => {
  // Define the answer result model.
  const AnswerResult = sequelize.define('AnswerResult', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  },
  {
    tableName: 'answer_results'
  });

  // Define the result associations.
  AnswerResult.associate = (models) => {
    // An answer result belongs to a question result.
    AnswerResult.belongsTo(models.QuestionResult, {
      foreignKey: {
        name: 'questionResultId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // An answer result belongs to an answer.
    AnswerResult.belongsTo(models.Answer, {
      foreignKey: {
        name: 'answerId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };

  return AnswerResult;
};
