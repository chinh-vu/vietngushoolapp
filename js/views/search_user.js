/*global define*/

define([
	'marionette',
	'templates',
	'views/search_user_results',
	'collections/user_profile'
], function (Marionette,templates, SearchResults, UserProfileCollection) {
  "use strict";

  return Marionette.Layout.extend({
    template : templates.tplSearchUser,

    regions : {
    	resultRegion: "#results"
    },

		events: {
			"click .search-btn" : "search"
		},

		search: function(e) {
			var that = this, view;
			var userList = new UserProfileCollection();
			var firstName = $.trim($('#firstName-input').val());
			var lastName = $.trim($('#lastName-input').val());
			userList.fetch({
				data: $.param({ 
					"fname": firstName,
					"lname": lastName
				}),
				success: function(collection) {
					view = new SearchResults({ userList: collection });
					that.resultRegion.show(view);
				},
			  error: function(coll, res) {
	        console.log("error getting org list");
	      }
			})
			// this.resultRegion.show(new SearchResults());
		}
  });
});
