const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var Products = sequelize.define('Products',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name : { type: DataTypes.STRING },
      price : { type: DataTypes.INTEGER },
      description : { type: DataTypes.TEXT }
    }
  );
  Products.prototype.dateFormat = (date) => (
    moment(date).format('YYYY-MM-DD h:mm:ss A')
  );
  return Products;
}
