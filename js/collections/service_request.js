define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'models/service_request'
], function($, _, Backbone, Config, ServiceRequest) {
  var ServiceRequestCollection;

  ServiceRequestCollection = Backbone.Collection.extend({
    model : ServiceRequest,
    // url   : Config.apiBase + '/userProfiles/:id/serviceRequests'

    url : function() {
      return Config.apiBase + '/userProfiles/' 
        + this.userProfileId + '/serviceRequests';
    }
  });

  return ServiceRequestCollection;
});