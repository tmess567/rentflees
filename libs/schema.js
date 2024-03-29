/*
coordsSchema = new SimpleSchema({
  XCoordinate: {
  	label: "X - Coordinate",
    type: String,
    max: 100
  },
  YCoordinate: {
  	label: "Y - Coordinate",
    type: String,
    max: 100
  },
});
*/
Listings.attachSchema(new SimpleSchema({
	image: {
		type: [String],
		label: "Image",
		optional: true,
    autoform: {
      type: "hidden",
      label: false
    }
	},
	title: {
		type: String,
		label: "Title",
		max: 50
	},
	author: {
		type: String,
		label: "author name",

		autoValue: function() {
    		if( Meteor.userId() )
    		{
    			//console.log(Meteor.userId);
    			//console.log(Meteor.userId());
    			return(Meteor.userId());
    			//return getData;
    			//return(Meteor.user().username)
    		}

	},
		autoform: {
			type: "hidden"
		}

	},

  avail: {
    type: Number,
    label: "avail",
    max: 200
  },
  
  address: {
    type: String,
    label: "Address",
    max: 200
  },
  rent: {
    type: Number,
    label: "Rent",
    min: 0
  },
  bhk: {
    type: Number,
    label: "BHK",
    min: 0
  },
  bathrooms: {
    type: Number,
    label: "Bathrooms",
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
		label: "Category",
		optional: true
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
  tenantPref: {
    type: [String],
    label: "Tenant Preference",
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
		label: "Owner's Name",
	},

	createdAt: {
		type: Date,
		autoValue: function() {
    		date = new Date;
    		return date;
	},
		autoform: {
			type: "hidden"
		}
	},

	XCoordinate: {
  	label: "X - Coordinate",
	optional: true,
    type: String,
    max: 100,
		autoform: {
			type: "hidden"
		}
  },
  YCoordinate: {
  	label: "Y - Coordinate",
	optional: true,
    type: String,
    max: 100,
		autoform: {
			type: "hidden"
		}
  },

  furnishing: {
  	type: String,
  	label: "furnishing",
  	optional: true
  }, 
/*  tenantPref: {
  	type: String,
  	label: "tenantPref",
  	optional: true
  }, */
  occupation: {
  	type: String,
  	label: "occupation",
  	optional: true
  }, 
  city: {
  	type: String,
  	label: "city",
  	optional: true
  }, 
  locality: {
  	type: String,
  	label: "locality",
  	optional: true
  }, 
  landmark: {
  	type: String,
  	label: "landmark",
  	optional: true
  }, 
  score: {
  	type: Number,
  	label: "score",
  	optional: true
  }, 
  verified: {
  	type: String,
  	label: "verified",
  	optional: true
  }, 
  foodstr: {
  	type: String,
  	label: "foodstr",
  	optional: true
  }, 
  amenitiesstr: {
    type: String,
    label: "amenitiesstr",
    optional: true
  }, 
  tenantPrefstr: {
    type: String,
    label: "tenantPrefstr",
    optional: true
  }, 


}));


SimpleSchema.debug = true;
