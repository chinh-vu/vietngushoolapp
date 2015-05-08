define([
  'marionette',
  'views/headerSignUp',
  'views/bodySignUpAddSpouse',
  'views/footer',
  'models/user',
  'bootstrap'
  ], 
  function (Marionette, HeaderSignUp, BodySignUpAddSpouse, Footer, User){
    "use strict";

    var AppSignUpAddSpouse = new Marionette.Application();

    // app.bindTo(todoList, 'all', function() {
    //   if (todoList.length === 0) {
    //     app.main.$el.hide();
    //     app.footer.$el.hide();
    //   } else {
    //     app.main.$el.show();
    //     app.footer.$el.show();
    //   }
    // });

    AppSignUpAddSpouse.addRegions({
      headerSignUp : '#headerSignUp',
      bodySignUpAddSpouse   : '#bodySignUpAddSpouse',
      footer : '#footer'
    });

    AppSignUpAddSpouse.addInitializer(function(){

      var viewOptions = {
        // collection : todoList
      };

      AppSignUpAddSpouse.headerSignUp.show(new HeaderSignUp(viewOptions));
      AppSignUpAddSpouse.bodySignUpAddSpouse.show(new BodySignUpAddSpouse(viewOptions));
      AppSignUpAddSpouse.footer.show(new Footer(viewOptions));

    });

    return AppSignUpAddSpouse;

});
