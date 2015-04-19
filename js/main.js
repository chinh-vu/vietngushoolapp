requirejs.config({
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'bootstrap': {
      deps: ['jquery'],
      exports: 'bootstrap'
    },
    'marionette': {
      deps: ['backbone'],
      exports: 'Backbone.Marionette'
    },
    'backbone.syphon' : [ 'backbone' ],
    'backgrid': {
      deps: ['backbone'],
      exports: 'Backgrid'   
    },
    'backgrid.object.cell': {
      deps:['backgrid'],
      exports :'BackgridObjectCell'
    }

  },
  /**
   * HACK:
   * Modified Underscore and Backbone to be AMD compatible (define themselves)
   * since it didn't work properly with the RequireJS shim when optimizing
   */
  paths: {
    'text'                : 'lib/text',
    'tpl'                 : 'lib/tpl',
    'hbs'                 : 'lib/hbs',
    'jquery'              : 'thirdparty/jquery-1.11.2',
    'jquery.dateFormat'   : 'lib/jquery.dateFormat',
    'underscore'          : 'lib/underscore-min',
    'backbone'            : 'lib/backbone-min',
    'bootstrap'           : 'lib/bootstrap',
    'marionette'          : 'lib/backbone.marionette',
    'moment'              : 'lib/moment',
    'Mediator'            : 'lib/mediator',
    'tpl'                 : 'lib/tpl',
    'backbone.wreqr'      : 'lib/backbone.wreqr',
    'backbone.babysitter' : 'lib/backbone.babysitter',
    'backbone.marionette.handlebars' : 'lib/backbone.marionette.handlebars',
    'backbone.syphon'     : 'lib/backbone.syphon', 
    'backbone.validation' : 'lib/backbone-validation',
    'backgrid'            : 'lib/backgrid',
    'backgrid.object.cell': 'lib/backgrid-object-cell'
  }
});

require([
  'app', 
  'backbone', 
  'routers/main_router', 'models/user'
], function(App, Backbone, Router, User) {
  "use strict";
  
  App.user = new User();
  App.user.credentials = {
    username: 'chinhtvu@yahoo.com',
    password: 'f84040a14467dee77c42f9d22627ce40e3169b74d39e9456a8a4ac0b02da2e955074d1ca9e768faa539a0900bf65fedb7a953d14267091133c4208c9f87b5082'
  };

  App.start();
  new Router();  
  Backbone.history.start();
  window.schoolApp = App;
//  App.initialize();
});