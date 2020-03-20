let express = require('express');
let router = express.Router();
let productService = require('../service/product.service');

router.get('/',  (req, res, next) => {
    productService.getAll(req.query).then((result)=> {
		if (result != null) {
			res.status(200).json({
				status: "success",
				data: result
			});
		} else {
			res.status(404).json({
				status: "fail",
				data: "No data found"
			});
		}
	}, 
	(reason) => {
		next(reason);
	})
	.catch((error)=> {
		next(error);
	});
});

router.post('/',  (req, res) => {
	productService.create(req.body).then((result)=> {
		if (result != null) {
			res.status(200).json({
				status: "success",
				data: result
			});
		} else {
			res.status(404).json({
				status: "fail",
				data: "No data found"
			});
		}
	}, 
	(reason)=> {
		next(reason);
	})
	.catch((error)=> {
		next(error);
	});
});

module.exports = router;
