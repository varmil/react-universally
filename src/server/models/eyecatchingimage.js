module.exports = function(sequelize, DataTypes) {
  var EyeCatchingImage = sequelize.define('EyeCatchingImage', {
    rst_id: DataTypes.INTEGER,
    filename: DataTypes.STRING,
    destination: DataTypes.STRING,
    path: DataTypes.STRING,
    size: DataTypes.INTEGER,
  }, {
    tableName: 'EyeCatchingImages'
  });
  return EyeCatchingImage;
};
