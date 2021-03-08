module.exports = (sequelize, DataTypes) => {
  // Define the image model.
  const Image = sequelize.define('Image', {
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
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }
  },
  {
    tableName: 'images'
  });

  // Define the image associations.
  Image.associate = (models) => {
    // An image has many answers.
    Image.hasMany(models.Quiz, {
      foreignKey: 'imageId'
    });

    // An image has many answers.
    Image.hasMany(models.Answer, {
      foreignKey: 'imageId'
    });

    // An image has many answers.
    Image.hasMany(models.Question, {
      foreignKey: 'imageId'
    });
  };

  return Image;
};
