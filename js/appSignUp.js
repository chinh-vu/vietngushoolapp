define([
  'marionette',
  'views/headerSignUp',
  'views/bodySignUp',
  'views/footer',
  'models/user',
  'bootstrap'
  ], 
  function (Marionette, HeaderSignUp, BodySignUp, Footer, User){
    "use strict";

    var AppSignUp = new Marionette.Application();

    // app.bindTo(todoList, 'all', function() {
    //   if (todoList.length === 0) {
    //     app.main.$el.hide();
    //     app.footer.$el.hide();
    //   } else {
    //     app.main.$el.show();
    //     app.footer.$el.show();
    //   }
    // });

    AppSignUp.addRegions({
      headerSignUp : '#headerSignUp',
      bodySignUp   : '#bodySignUp',
      footer : '#footer'
    });

    AppSignUp.addInitializer(function(){

      var viewOptions = {
        // collection : todoList
      };

      AppSignUp.headerSignUp.show(new HeaderSignUp(viewOptions));
      AppSignUp.bodySignUp.show(new BodySignUp(viewOptions));
      AppSignUp.footer.show(new Footer(viewOptions));

    });

    return AppSignUp;

});
