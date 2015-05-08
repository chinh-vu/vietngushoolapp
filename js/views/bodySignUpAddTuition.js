define([
	'marionette',
	'templates'
	], 
	function (Marionette, Templates) {
  		"use strict";

  		return Marionette.ItemView.extend({
    		template : Templates.tplBodySignUpAddTuition
  		});
});
