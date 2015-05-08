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
  'appSignUp', 
  'backbone', 
  'routers/main_router',
  'models/user'
  ], 
  function (AppSignUp, Backbone, Router, User) {
    "use strict";

    AppSignUp.start();
    new Router();
});
