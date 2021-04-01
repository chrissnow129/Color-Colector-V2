const ColorSch = require('../models/ColorSch');
const express = require('express');
const colorRouter = express.Router();

//Create
colorRouter.post('/', async (req, res) => {
	try {
		const newColor = await ColorSch.create(req.body);

		res.status(200).json(newColor);
	} catch (error) {
		res.status(400).json(error);
	}
});

//Read
//INDEX

colorRouter.get('/', async (req, res) => {
	try {
		const foundColors = await ColorSch.find({});

		res.status(200).json(foundColors);
	} catch (error) {
		res.status(400).json(error);
	}
});

//SHOW
colorRouter.get('/:id', async (req, res) => {
	try {
		const foundColor = await ColorSch.findById(req.params.id);

		res.status(200).json(foundColor);
	} catch (error) {
		res.status(400).json(error);
	}
});

//Destroy
colorRouter.delete('/:id', async (req, res) => {
	try {
		const foundColor = await ColorSch.findByIdAndDelete(req.params.id);

		res.status(200).json(foundColor);
	} catch (error) {
		res.status(400).json(error);
	}
});

//Update
colorRouter.put('/:id', async (req, res) => {
	try {
		const foundColor = await ColorSch.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);

        res.status(200).json(foundColor)
	} catch (error) {
		res.status(400).json(error);
	}
});


module.exports = colorRouter;