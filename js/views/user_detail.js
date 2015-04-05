/*global define*/

define([
	'marionette',
	'templates',
	'views/service_request_list',
	'collections/service_request'
], function (
	Marionette,
	templates, 
	ServiceRequestList, 
	ServiceRequestCollection
	) {
  "use strict";

  return Marionette.Layout.extend({
    template : templates.tplUserDetail,

  	events: {
			"click .requests-tab"  : "showRequests"
		},

  	regions : {
  		tabContentRegion: "#tabContent"
  	},

	  onRender: function() {
	  	// on first render show the service request list
	  	this.showRequests();
	  },

	  showRequests: function() {
	  	var that = this;
	  	var reqCollection = new ServiceRequestCollection();
	  	reqCollection.userProfileId = this.model.id;
	  	reqCollection.fetch({
	  		success: function(collection) {
	  			var requestList = new ServiceRequestList({ reqList: collection});
	  			that.tabContentRegion.show(requestList);
	  		}
	  	})

	  }

  });
});