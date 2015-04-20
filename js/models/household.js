define([
  'jquery',
  'underscore',
  'backbone', 'app', 'config'
], function($, _, Backbone, App, Config) {

  var HouseHoldProfile = Backbone.Model.extend({
	defaults : {
		houseHold : '',
		line1 : '',
		line2 : '',
		city : '',
		state : '',
		zipcode : '',
		primaryPhoneNbr : '',
		primaryPhoneType : '',
		secondaryPhoneNbr : '',
		secondaryPhoneType : ''

		// ,profiles:[]
	},

	urlRoot:Config.apiBase + '/HouseHoldProfile',
	// urlRoot : function() {
	// 	console.log("URL: ", Config.apiBase);
 //     //    return Config.apiBase + (this.id ? '/addresses/' + this.id : '/addresses'); 	
	// },

	// urlRoot: 'localhost:8080/core-api/v1/schools/addresses',

	initialize: function() {
		this.listenTo(App.vent, 'registration:address:submit', function(model) {
			console.log('Address Model received event ', model);
			
			return this;
		});
	},
	// validation: {
	//     line1: {
	//       required: true,
	//       msg: 'Please enter a valid address'
	//     },
	//     city: {
	//       required: true,
	//       msg: 'Please enter a valid city'
	//     },
	//     state: {
	//       required: true,
	//       msg: 'Please enter a valid state'
	//     },
	//     zipcode: {
	//       required: true,
	//       msg: 'Please enter a valid zip code'
	//     },
	//     primaryPhoneNbr: {
	//       required: true,
	//       msg: 'Please enter a valid phone number'
	//     }
	// }
	// validate : function(attrs, options) {
	// 	var errors = {};
	// 	if (!attrs.line1) {
	// 		errors.line1 = "can't be blank";
	// 	}
	// 	if (!attrs.city) {
	// 		errors.city = "can't be blank";
	// 	}

	// 	if (!attrs.state) {
	// 		errors.state = "can't be blank";
	// 	}

	// 	if (!attrs.zipcode) {
	// 		errors.zipcode = "can't be blank";
	// 	}

	// 	if (!attrs.primaryPhoneNbr && !attrs.secondaryPhoneNbr) {
	// 		errors.primaryPhoneNbr = "must have at least one phone number";
	// 	}

	// 	console.log('address model error: ', errors);
	// 	if (!_.isEmpty(errors)) {
	// 		console.log("return errors: ", errors);
	// 		return errors;
	// 	}
	// }
  });
  return HouseHoldProfile;
});