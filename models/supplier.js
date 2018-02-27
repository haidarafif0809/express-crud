'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  }, {});
  Supplier.associate = function(models) {
    // associations can be defined here
    Supplier.belongsToMany(models.Item,{through: models.SupplierItem});
    Supplier.hasMany(models.SupplierItem);
  };
  Supplier.afterDestroy((item) => {
    sequelize.models.SupplierItem.all({
      where: {
        SupplierId: item.id
      }
    }).then((supplierItems) => {
      supplierItems.forEach((item) => {
        item.destroy();
      })
    }).catch((err) => {
      console.log(err);
    })
  });
  return Supplier;
};
