// js/models/request.js

define('RequestModel', [
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone) {
  var Request;

  Request = Backbone.Model.extend({
    
    urlRoot: "http://localhost:8080/api/serviceRequests",
   
  });

  return Request;
});