define([
  'jquery',
  'underscore',
  'backbone',
  'config'
], function($, _, Backbone, Config) {
  var ServiceRequest;

  ServiceRequest = Backbone.Model.extend({
    
    // url   : Config.apiBase + '/userProfiles/:id/serviceRequests'

    url : function() {
      return Config.apiBase + '/userProfiles/' 
        + this.model.id + '/serviceRequests';
    }
   
  });

  return ServiceRequest;
});