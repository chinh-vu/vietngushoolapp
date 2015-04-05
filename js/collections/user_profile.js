define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'models/user_profile'
], function($, _, Backbone, Config, UserProfile) {
  var UserProfileCollection;

  UserProfileCollection = Backbone.Collection.extend({
    model : UserProfile,
    url   : Config.apiBase + '/userProfiles'
  });

  return UserProfileCollection;
});