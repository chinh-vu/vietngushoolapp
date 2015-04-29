define([
	'underscore',
	'marionette',
	'templates',
	'app', 'models/address', 'backbone.syphon', 'backbone.validation'
], function (underscore, Marionette,templates, App, Address) {
  "use strict";

  return Marionette.ItemView.extend({
    template : templates.tplRegistrationProfileAddress,
    events: {
        'click #householdContactSubmitButton': function (e) {
            e.preventDefault();
            this.householdContactSubmit();
        }
    },

    initialize: function() {    	

      	underscore.extend(Backbone.Validation.callbacks, {
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
    	//console.log("model =", JSON.stringify(this.model));
    	this.model.on('change', this.render, this);
    	if(this.model.get('id')) {
    		this.model.fetch({
	          silent: false,
	          sync: true,
	          success:function(model, resp, opt){
	            console.log(' ---------------------- success', resp, model);
	          }, error:function(model, resp, opt){
	            console.log(' ---------------------- error', model);
	          }, wait:true
	        });
    		console.log('line1 ', this.model.get('line1'));
    	}

    	//console.log("model =", JSON.stringify(this.model));

    	// model.listenTo(company.model, "change", company.render);
    },

    householdContactSubmit: function () {
        var data = Backbone.Syphon.serialize(this);
    	//console.log("data =", JSON.stringify(data));
    	//console.log("this.model =", JSON.stringify(this.model));
    	this.model.set(data);
        
        if(this.model.isValid(true)){
            // this.model.save();
            alert('Great Success!');
        } else {
        	alert('Failure');
        }
    },

    onRegistrationAddressCreate : function() {
		var data = Backbone.Syphon.serialize(this);
		console.log('onRegistrationAddressCreate: ', data);
		
		//this.trigger("form:registration:address:submit", data);
	},

	onFormDataInvalid : function(errors) {
		var $view = this.$el;

		var clearFormErrors = function() {
			var $form = $view.find("form");
			$form.find(".help-inline.error").each(function() {
				$(this).remove();
			});
			$form.find(".control-group.error").each(function() {
				$(this).removeClass("error");
			});
		};

		var markErrors = function(value, key) {
			var $controlGroup = $view.find("#family-" + key).parent();
			var $errorEl = $("<span>", {
				class : "help-inline error",
				text : value
			});
			$controlGroup.append($errorEl).addClass("error");
		};

		clearFormErrors();
		_.each(errors, markErrors);
	}
  });
})