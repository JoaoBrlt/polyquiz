module.exports = (sequelize, DataTypes) => {
  // Define the guest model.
  const Guest = sequelize.define('Guest', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    accessibility: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'guests'
  });

  // Define the guest associations.
  Guest.associate = (models) => {
    // A guest belongs to many quizzes.
    Guest.belongsToMany(models.Quiz, {
      as: 'quizzes',
      foreignKey: 'guestId',
      through: 'guest_quizzes'
    });

    // A guest has many results.
    Guest.hasMany(models.Result, {
      foreignKey: 'guestId'
    });
  };

  return Guest;
};
