module.exports = (sequelize, DataTypes) => {
  // Define the theme model.
  const Theme = sequelize.define('Theme', {
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
    tableName: 'themes'
  });

  // Define the theme associations.
  Theme.associate = (models) => {
    // A theme belongs to an image.
    Theme.belongsTo(models.Image, {
      as: 'image',
      foreignKey: {
        name: 'imageId',
        allowNull: true
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    // A theme has many quizzes.
    Theme.hasMany(models.Quiz, {
      foreignKey: 'themeId'
    });
  };

  return Theme;
};
