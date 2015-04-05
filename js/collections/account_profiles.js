define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'models/account_profile'
], function($, _, Backbone, Config, AccountProfile) {
  var AccountProfileCollection;

  AccountProfileCollection = Backbone.Collection.extend({
    model : AccountProfile,
    url   : Config.apiBase + '/AccountProfiles'
  });

  return AccountProfileCollection;
});