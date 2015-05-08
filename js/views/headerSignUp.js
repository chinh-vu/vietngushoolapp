define([
	'marionette',
	'templates'
	], function (Marionette, Templates) {
  		"use strict";

  		return Marionette.ItemView.extend({
    		template : Templates.tplHeaderSignUp,

    		select: function(item) {
      			$('.nav li').removeClass('active');
      			$('.' + item).addClass('active');
    		}
  		});
});
