/*global define*/

define([
	'marionette',
	'templates',
	'collections/account_profiles'
], function (Marionette, templates, OrgCollection) {
  "use strict";

  return Marionette.ItemView.extend({

    template : templates.tplAddUserProfile,

		events: {
			"click .save-btn" : "saveRequest"
		},

		initialize: function() {
      // this.orgList = new OrgCollection();
      // this.orgList.fetch();
      // this.template({ orgs: this.orgList});
		},

		serializeData: function() {
			console.log(this.options.orgList.toJSON());
			return {
				model: this.model.toJSON(),
				orgs: this.options.orgList.toJSON()
			}
		},

		saveRequest: function(e) {
			console.log("save request");
			this.model.save({
				firstName : $.trim($('#fname-input').val()),
				lastName : $.trim($('#lname-input').val()),
				orgId : $.trim($('#org-input').val())
			}, {
				silent: false,
				sync: true,
				success: function(model, res) {
					if (res && res.errors) {
						console.log(res.errors);
					}
					else {
						console.log("saved");
						// console.log(model);
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