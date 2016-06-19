Listings.attachSchema(new SimpleSchema({
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
    			console.log(Meteor.userId());
    			return(Meteor.userId());
    			//return getData;
    			//return(Meteor.user().username)
    		}
	    	
	},
		autoform: {
			type: "hidden"
		}
		
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
	ownerUname: {
		type: String,
		label: "Owner UserName",
		
		autoValue: function() {
    		if( Meteor.user().username )
    		{
    			getData = Meteor.user();
    			getData.context = Meteor.user().username;
    			//console.log(Meteor.user().username);
    			return(Meteor.user().username);
    			//return getData;
    			//return(Meteor.user().username)
    		}
	    	
	},
		autoform: {
			type: "hidden"
		}
		
	},

	owner: {
		type: String,
		label: "Owner's Name",		
	},

	ownerEmail: {
		type: String,
		label: "Owner's Email",
		autoValue: function() {
    		if( Meteor.user() )
    		{
    			getData = Meteor.user();
    			getData.context = Meteor.user().emails[0].address;
    			return(Meteor.user().emails[0].address);
    			//return getData;
    			//return(Meteor.user().emails[0].address)
    		}
	    	
	},
		autoform: {
			type: "hidden"
		}
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
}



}));


SimpleSchema.debug = true;