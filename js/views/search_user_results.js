/*global define*/

define([
	'marionette',
	'templates'
], function (Marionette,templates) {
  "use strict";

  return Marionette.ItemView.extend({
    template : templates.tplSearchUserResults,

	serializeData: function() {
		return {
			users: this.options.userList.toJSON()
		}
	}

  });
});