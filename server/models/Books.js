module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Books.associate = (models) => {
    Books.hasMany(models.Ratings, {
      onDelete: 'cascade',
    });
  };

  return Books;
};
