module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Books, {
      onDelete: 'cascade',
    });

    Users.hasMany(models.Ratings, {
      onDelete: 'cascade',
    });
  };

  return Users;
};
