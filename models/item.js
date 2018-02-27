'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem:{
      type: DataTypes.STRING,
      unique: {
        msg: "Code Item harus Unik"
      },
      validate: {
        is: {
          args: /(HP|SW|LP)\d{4}/,
          msg: "Code Item harus diawali dengan HP | SW | LP dan diikuti’ dengan 4 digit angka"
        }
      }
    }
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    Item.belongsToMany(models.Supplier,{through: models.SupplierItem});
    Item.hasMany(models.SupplierItem);
  };

  Item.afterDestroy((item) => {
    sequelize.models.SupplierItem.all({
      where: {
        ItemId: item.id
      }
    }).then((supplierItems) => {
      supplierItems.forEach((item) => {
        item.destroy();
      })
    }).catch((err) => {
      console.log(err);
    })
  });
  return Item;
};
