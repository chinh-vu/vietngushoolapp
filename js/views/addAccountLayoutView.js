define([
	'jquery',
  'underscore',
  'backbone',
  'backgrid',
	'marionette',
	'templates',
  'appSignUp',
	'views/addAccountView'
  ], 
  function ($, _, Backbone, Backgrid, Marionette, Templates, AppSignUp, AddAccountView) {
    "use strict";

    return Marionette.LayoutView.extend({
      
      template : Templates.tplAddAccountLayout,

      regions : {
    		addAccountRegion : 		        '#add-account-region'
    	},

      onBeforeShow: function() {

        var addAccountView = new AddAccountView({ model: this.model });
        this.getRegion('addAccountRegion').show(addAccountView);
      
        addAccountView.listenTo(AppSignUp.vent, 'addAccount:complete:submit', function() {
          var self = this;
          var isFormComplete = false;

          var accountData = Backbone.Syphon.serialize(self);
          this.model.set(accountData);
          
          if (this.model.isValid(true)) {
              isFormComplete = true;
          }

          if (isFormComplete) {
            console.log('accountData: ', JSON.stringify(accountData));

            self.model.save(accountData, {
              silent: false,
              sync: true,
              success: function(model, resp, opt){
                console.log('Success!', resp);
              }, 
              error:function(model, resp, opt){
                console.log('Error!', resp);
              }, 
              wait:true
            });
          }
        }, this);
      }
    });
});
