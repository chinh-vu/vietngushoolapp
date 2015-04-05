/*global define*/

define([
	'marionette',
	'jquery.dateFormat',
	'templates'
], function (Marionette, DateFormat, templates) {
  "use strict";

  return Marionette.ItemView.extend({
    template : templates.tplServiceRequestList,

	serializeData: function() {
		return {
			reqs: this.options.reqList.toJSON()
		}
	}

  });
});