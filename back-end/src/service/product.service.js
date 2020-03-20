let productRepository = require('../repository/product.repository');
const sequelize = require('sequelize');

exports.getAll = function(filter = {}) {
    const Op = sequelize.Op;

    let filteration = {
        where: {},
    }
    if(filter.sortField && filter.sortDirection){
        filter.sortField = filter.sortField === 'Created Date' ? 'created_at' : filter.sortField
        filteration.order = [
            [filter.sortField, filter.sortDirection]
        ]
    };
    if(typeof filter.limit != 'undefined' && typeof filter.offset != 'undefined'){
        filteration.limit = Number(filter.limit);
        filteration.offset = Number(filter.offset);
    }

    if(filter.startDate && filter.endDate)
    {
        filteration.where = {
            created_at: {
                [Op.between]: [filter.startDate + ' 00:00:00', filter.endDate + ' 23:59:59']
            }
        }
    }
    else if(filter.startDate)
    {
        filteration.where = {
            created_at : filter.startDate
        }
    }    
    else if(filter.endDate)
    {
        filteration.where = {
            created_at : filter.endDate
        }
    }

    if(filter.generalSearch){
        let generalSearch = {
            [Op.or]:{
                name: {
                    [Op.like]: `%${filter.generalSearch}%`
                },
                price: {
                    [Op.like]: `%${filter.generalSearch}%`
                },
            }
        };
        
        Object.assign(filteration.where,generalSearch);
    }

    return productRepository.getAll(filteration)
    .then((result)=>{
        delete filteration.limit;
        delete filteration.offset;
        return productRepository.getAll(filteration)
        .then((result1)=>{
            return {
                data: result,
                totalRows: result1.length
            }
        })
    });
}

exports.create = function(data) {
	return productRepository.create(data);
}
