define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'models/household'
], function($, _, Backbone, Config, Address) {
  var HouseHoldCollection;

  HouseHoldCollection = Backbone.Collection.extend({
    model : Address,
    url   : Config.apiBase + '/HouseHoldProfile'
  });

  return HouseHoldCollection;
});