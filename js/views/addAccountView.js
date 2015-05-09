define([
	'underscore',
	'marionette',
	'templates',
  'appSignUp', 
  'backbone.syphon', 
  'backbone.validation'
  ], function (_, Marionette, Templates, AppSignUp) {
    "use strict";

    return Marionette.ItemView.extend({
      template : Templates.tplAddAccount,
      events: {
        'click a.js-add-account-complete' : 'addAccountComplete'
      },

      initialize: function() {

      	_.extend(Backbone.Validation.callbacks, {
          valid: function (view, attr, selector) {
              var $el = view.$('[name=' + attr + ']'), 
                  $group = $el.closest('.form-group');
              
              $group.removeClass('has-error');
              $group.find('.help-block').html('').addClass('hidden');
          },
          invalid: function (view, attr, error, selector) {
              var $el = view.$('[name=' + attr + ']'), 
                  $group = $el.closest('.form-group');
              
              $group.addClass('has-error');
              $group.find('.help-block').html(error).removeClass('hidden');
          }
      	});

        Backbone.Validation.bind(this);
      },

      addAccountComplete : function(e) {
        e.preventDefault();
        e.stopPropagation();
        AppSignUp.vent.trigger('addAccount:complete:submit');
      }
    });
})
