module.exports = (sequelize, DataTypes) => {
  // Define the quiz model.
  const Quiz = sequelize.define('Quiz', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }
  },
  {
    tableName: 'quizzes'
  });

  // Define the quiz associations.
  Quiz.associate = (models) => {
    // A quiz belongs to a theme
    Quiz.belongsTo(models.Theme, {
      foreignKey: {
        name: 'themeId',
        allowNull: false
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // A quiz belongs to an image.
    Quiz.belongsTo(models.Image, {
      foreignKey: {
        name: 'imageId',
        allowNull: true
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    // A quiz belongs to many guests.
    Quiz.belongsToMany(models.Guest, {
      foreignKey: 'quizId',
      through: 'guest_quizzes'
    });

    // A quiz has many questions.
    Quiz.hasMany(models.Question, {
      as: 'questions',
      foreignKey: 'quizId'
    });

    // A quiz has many answers.
    Quiz.hasMany(models.Answer, {
      foreignKey: 'quizId'
    });

    // A quiz has many results.
    Quiz.hasMany(models.Result, {
      foreignKey: 'quizId'
    });
  };

  return Quiz;
};
