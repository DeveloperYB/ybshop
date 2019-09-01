const moment = require('moment');
const numeral = require('numeral');

module.exports = (sequelize, DataTypes) => {
  var Contacts = sequelize.define('Contacts',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING },
      thumbnail: { type: DataTypes.STRING },
      price: { type: DataTypes.INTEGER },
      description: { type: DataTypes.TEXT }
    }
  );
  // 제품 모델 관계도
  Contacts.associate = (models) => {
    // 메모 모델에 외부키를 건다
    // onDelete 옵션의 경우 제품 하나가 삭제되면 외부키가 걸린 메모들도 싹다 삭제해준다
    Contacts.hasMany(
      models.ProductsMemo,
      {
        as: 'Memo',
        foreignKey: 'contacts_id',
        sourceKey: 'id',
        onDelete: 'CASCADE'
      },
    );
  };

  Contacts.prototype.dateFormat = (date) => moment(date).format('YYYY-MM-DD h:mm:ss A');
  Contacts.prototype.priceFormat = (date) => numeral(date).format('0,0');
  return Contacts;
}
