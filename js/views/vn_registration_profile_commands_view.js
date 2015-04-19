define([
	'marionette',
	'templates',
	'app'
], function (Marionette,templates, App) {
  "use strict";

   return Marionette.ItemView.extend({
    template : templates.tplRegistrationProfileCommands,
		events : {
			'click a.js-registration-complete' : 'registrationComplete',
			'click a.js-registration-reset' : 'showProfilesInGrid'
		},

		registrationComplete : function(e) {
			e.preventDefault();
			e.stopPropagation();

			App.vent.trigger('registration:complete:submit');
		}    	
	});
})