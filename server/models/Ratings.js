module.exports = (sequelize, DataTypes) => {
  const Ratings = sequelize.define('Ratings', {
    rating: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Ratings;
};
