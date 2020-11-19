//this model is currently not in use
const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	minRate: {
		type: Number,
		required: true,
	},
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
		required: true,
	},
	period: {
		type: Object,
		required: true,
	},
	frequancy: {
		type: Object,
		required: true,
	},
	days: {
		type: Array,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	columnsTitles: {
		type: Array,
		required: true,
	},
	total: {
		type: Number,
		required: true,
	},
	completed: {
		type: Number,
		required: true,
	},
	items: {
		type: Array,
		required: true,
	},
});

mongoose.model('Program', programSchema);
