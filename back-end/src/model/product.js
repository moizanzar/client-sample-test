/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
    let product = sequelize.define('product', {
      name: {
        type: DataTypes.STRING(50),
      },
      price: {
        type: DataTypes.DECIMAL,
      }
    }, {
      underscored: true,
      tableName: 'product'
    });
  
    return product;
  };
  