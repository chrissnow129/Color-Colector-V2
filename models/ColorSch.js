const { Schema, model } = require('mongoose');

const ColorSchema = new Schema({
	hex: String,
	image: String,
	name: String,
	value: String,
	r: String,
	g: String,
	b: String,
	h: String,
	s: String,
	l: String
});

const ColorSch = model('ColorSch', ColorSchema);

module.exports = ColorSch;
