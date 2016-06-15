Listings.attachSchema(new SimpleSchema({
	title: {
		type: String,
		label: "Title",
		max: 50
	},
	addess: {
		type: String,
		label: "Address",
		max: 200
	},
	rent: {
		type: Number,
		label: "Rent",
		min: 0
	},
	security: {
		type: Number,
		label: "Security",
		optional: true,
	},
	type: {
		type: String,
		label: "Type"
	},
	category: {
		type: String,
		label: "Category"
	},
	description: {
		type: String,
		label: "Description",
		optional: true
	},
	foodServices: {
		type: [String],
		label: "Food Services",
		optional: true
	},
	rules: {
		type: [String],
		label: "Rules",
		optional: true
	},
	amenities: {
		type: [String],
		label: "Amenities",
		optional: true
	},
	owner: {
		type: String,
		label: "Owner Name"
	},
	ownerEmail: {
		type: String,
		label: "Owner's Email"
	}
}));