let models = require('../model');

exports.getAll = function(filter){
	return models.product.findAll(filter);
}

exports.create = function(data){
	return models.product.create(data);
}

exports.delete = function (id) {
  return models.product.destroy({
    where: { id }
  });
};