define([
  'jquery',
  'underscore',
  'backbone',
  'config'
], function($, _, Backbone, Config) {
  var Student;

  Student = Backbone.Model.extend({
    
    urlRoot: Config.apiBase + '/students',
   
  });

  return Student;
});