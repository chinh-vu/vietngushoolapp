define([
	'marionette',
  'backbone',
  'backgrid',
  'appSignUp',
  'views/addAccountLayoutView',
  'models/accountModel',
  'views/home'
  ],
  function (Marionette, Backbone, Backgrid, AppSignUp, AddAccountLayoutView, AccountModel, Home) {
    'use strict';

    return Marionette.AppRouter.extend({
      
      initialize: function(options){
        
        var accountModel = new AccountModel();
        var addAccountLayoutView = new AddAccountLayoutView({ model: accountModel });
        addAccountLayoutView.render();
        AppSignUp.bodySignUp.show(addAccountLayoutView);
  		},

      routes : {
        ''                          : 'home'
      },

      home : function(param) {
      	/*AppSignUp.header.currentView.select('home-menu');
      	if (!this.homeView) {
      		this.homeView = new Home();
      	}
      	AppSignUp.main.show(this.homeView);*/
      }
    });
});
