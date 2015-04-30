define([
  'jquery',
  'underscore',
  'backbone',
  'config'
], function($, _, Backbone, Config) {

	var AccountProfile = Backbone.Model.extend({

		urlRoot: Config.apiBase + '/AccountProfiles',
		defaults : {
			firstName : '',
			middleName : '',
			lastName : '',
			dob : '',
			gender : '',
			memberType : '',
			grade:'',
			paid:'',
			schoolYear:''
		},

		isValidUserProfile : function (attrs, options) {
			if(!_.isEmpty(this.get('firstName')) && !_.isEmpty(this.get('lastName'))) {
				console.log('a valid profile ' + this.id);

				return true;
			}

			console.log('not a valid profile ' + this.id);

			return false;
		}
	});
	
	return AccountProfile;
});