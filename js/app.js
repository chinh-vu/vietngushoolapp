define(
  ['marionette',
  'views/header',
  'views/home',
  'models/user',
  'bootstrap'
  ],
  function(marionette, Header, Home, User){
    "use strict";

    var App = new marionette.Application();

    // app.bindTo(todoList, 'all', function() {
    //   if (todoList.length === 0) {
    //     app.main.$el.hide();
    //     app.footer.$el.hide();
    //   } else {
    //     app.main.$el.show();
    //     app.footer.$el.show();
    //   }
    // });

    App.addRegions({
      header : '#header',
      main   : '#main'
    });

    App.addInitializer(function(){

      var viewOptions = {
        // collection : todoList
      };
    
      


      App.header.show(new Header(viewOptions));
      App.main.show(new Home(viewOptions));
    });

    return App;
});