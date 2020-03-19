let express = require('express');
let router = express.Router();
let productService = require('../service/product.service');

router.get('/', function (req, res) {
    productService.getAll(req.query).then(function (result) {
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
	}, function (reason) {
		res.status(500).json({
			status: "fail",
			reason: reason
		});
	}).catch(function (reason) {
		res.status(500).json({
			status: "fail",
			reason: error
		});
	});
});

router.get('/:id', function (req, res) {
	sourceService.getSourceByID(req.params.id).then(function (result) {
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
	}, function (reason) {
		res.status(500).json({
			status: "fail",
			reason: reason
		});
	}
	).catch(function (error) {
		res.status(500).json({
			status: "fail",
			reason: error
		});
	});
});

router.post('/', function (req, res) {
	productService.create(req.body).then(function (result) {
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
	}, function (reason) {
		res.status(500).json({
			status: "fail",
			reason: reason
		});
	}).catch(function (error) {
		res.status(500).json({
			status: "fail",
			reason: error
		});
	});
});

router.delete('/:id', function (req, res) {
	sourceService.deleteSource(req.params.id).
		then(function (result) {
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
		}, function (reason) {
			res.status(500).json({
				status: "fail",
				reason: reason
			});
		})
		.catch(function (error) {
			res.status(500).json({
				status: "fail",
				reason: error
			});
		});
});

router.put('/:id', function (req, res) {
	sourceService.updateSource(req.body)
		.then(function (result) {
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
		}, function (reason) {
			res.status(500).json({
				status: "fail",
				reason: reason
			});
		})
		.catch(function (error) {
			res.status(500).json({
				status: "fail",
				reason: error
			});
		});
});

module.exports = router;
