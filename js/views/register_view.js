/*global define*/

define([
	'marionette',
	'templates'
], function (Marionette,templates) {
  "use strict";

  return Marionette.ItemView.extend({
    template : templates.tplRegister,
	
		events: {
			"click .save-btn"            : "saveRequest"
		},

		saveRequest: function(e) {
			console.log("save request");
			this.model.save({
				name : $.trim($('#name-input').val()),
				address : { 
					line1 : $.trim($('#line1-input').val()),
					line2 : $.trim($('#line2-input').val()),
					city : $.trim($('#city-input').val()),
					state : $.trim($('#state-input').val()),
					zipcode : $.trim($('#zip-input').val()),
				}
			}, {
				silent: false,
				sync: true,
				success: function(model, res) {
					if (res && res.errors) {
						console.log(res.errors);
					}
					else {
						console.log("saved");
						model.trigger('save-success', model.get('id'));
					}
				},
				error: function(model, res) {
					console.log("error saving org");
					console.log(res.errors);
				}
			})
		}
  });
});