'use strict';
module.exports = (sequelize, DataTypes) => {
  var SupplierItem = sequelize.define('SupplierItem', {
    SupplierId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    validate: {
      oneSuplierOneItem(){
        SupplierItem.findOne({
          where : {
            SupplierId: this.SupplierId,
            ItemId: this.ItemId
          }
        }).then((item) => {
          console.log(item);
          if (item) {
            throw new Error('Tidak Boleh Menambah item yang sama di supplier yang sama!');
          }
        });
      }
    }
  });
  SupplierItem.associate = function(models) {
    // associations can be defined here
    SupplierItem.belongsTo(models.Item);
    SupplierItem.belongsTo(models.Supplier);

  };
  SupplierItem.prototype.formatUang = function () {
    let reverse = this.price.toString().split('').reverse();
    let arr= [];
    for(var i = 0; i<reverse.length;i++){
      if((i+1) % 3 === 0 && (i+1) !== reverse.length){
        arr.push(reverse[i]);
        arr.push('.');
      }else{
        arr.push(reverse[i]);
      }
    }
    return 'Rp. '+arr.reverse().join('');
  };
  return SupplierItem;
};
