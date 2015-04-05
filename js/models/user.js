define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'app'
], function($, _, Backbone, Config, App) {
  var User;

  User = Backbone.Model.extend({    
    urlRoot: Config.apiBase + '/users',                

    initialize: function () {},
	getCredentials: function () {
		return {
			username: this.credentials.username,
			password: this.credentials.password
		};
	},

	getUsername: function () {
		return this.credentials.username;
	},

	getPassword: function () {
		return this.credentials.password;
	}
  });

  return User;
});