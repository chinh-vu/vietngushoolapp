define([
  'marionette',
  'views/headerSignUp',
  'views/bodySignUpAddTuition',
  'views/footer',
  'models/user',
  'bootstrap'
  ], 
  function (Marionette, HeaderSignUp, BodySignUpAddTuition, Footer, User){
    "use strict";

    var AppSignUpAddTuition = new Marionette.Application();

    // app.bindTo(todoList, 'all', function() {
    //   if (todoList.length === 0) {
    //     app.main.$el.hide();
    //     app.footer.$el.hide();
    //   } else {
    //     app.main.$el.show();
    //     app.footer.$el.show();
    //   }
    // });

    AppSignUpAddTuition.addRegions({
      headerSignUp : '#headerSignUp',
      bodySignUpAddTuition   : '#bodySignUpAddTuition',
      footer : '#footer'
    });

    AppSignUpAddTuition.addInitializer(function(){

      var viewOptions = {
        // collection : todoList
      };

      AppSignUpAddTuition.headerSignUp.show(new HeaderSignUp(viewOptions));
      AppSignUpAddTuition.bodySignUpAddTuition.show(new BodySignUpAddTuition(viewOptions));
      AppSignUpAddTuition.footer.show(new Footer(viewOptions));

    });

    return AppSignUpAddTuition;

});
