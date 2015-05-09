define([
  	'backbone', 
  	'appSignUp', 
  	'config'
	], 
	function (Backbone, AppSignUp, Config) {

	  	var Account = Backbone.Model.extend({
			defaults : {
				emailAddress : '',
				firstName : '',
				middleName : '',
				lastName : '',
				password : '',
				birthDate : '',
				gender : '',
				addressLine1 : '',
				addressLine2 : '',
				city : '',
				state : '',
				zip : '',
				primaryPhone : '',
				primaryPhoneType : '',
				secondaryPhone : '',
				secondaryPhoneType : '',
				preferredContactMethod : ''
			},

			urlRoot: Config.apiBase + '/Account',

			initialize: function() {
				
			},

			validation: {
			    emailAddress: {
			      required: true,
			      pattern: 'email',
			      msg: 'Please enter a valid email'
			    },
			    firstName: {
			      required: true,
			      msg: 'Please enter a valid first name'
			    },
			    lastName: {
			      required: true,
			      msg: 'Please enter a valid last name'
			    },
			    password: {
			      required: true,
			      msg: 'Please enter a valid password'
			    },
			    confirmPassword: {
			      equalTo: 'password',
			      msg: 'Please confirm password'
			    },
			    addressLine1: {
			      required: true,
			      msg: 'Please enter a valid address'
			    },
			    city: {
			      required: true,
			      msg: 'Please enter a valid city'
			    },
			    state: {
			      required: true,
			      msg: 'Please select a valid state'
			    },
			    zip: {
			      required: true,
			      length: 5,
			      pattern: 'digits',
			      msg: 'Please enter a valid zip code'
			    },
			    /*birthDate: {
			      required: false,
			      msg: 'Please enter a valid birth date'
			    },*/
			    gender: {
			      required: true,
			      msg: 'Please select a valid gender'
			    },
			    primaryPhone: {
			      required: true,
			      length: 10,
			      pattern: 'digits',
			      msg: 'Please enter a valid phone number'
			    },
			    primaryPhoneType: {
			      required: true,
			      msg: 'Please select a valid phone type'
			    },
			    secondaryPhone: {
			      required: false,
			      length: 10,
			      pattern: 'digits',
			      msg: 'Please enter a valid phone number'
			    },
			    /*secondaryPhoneType: {
			      required: false,
			      msg: 'Please select a valid phone type'
			    },*/
			    preferredContactMethod: {
			      required: true,
			      msg: 'Please select a valid contact method'
			    }
			}
	  	});

  	return Account;
});
