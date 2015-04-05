define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'models/address'
], function($, _, Backbone, Config, Address) {
  var UserProfile;

  UserProfile = Backbone.Model.extend({    
    urlRoot : Config.apiBase + '/userProfiles',
  });

  return UserProfile;
});