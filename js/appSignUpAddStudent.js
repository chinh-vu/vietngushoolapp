define([
  'marionette',
  'views/headerSignUp',
  'views/bodySignUpAddStudent',
  'views/footer',
  'models/user',
  'bootstrap'
  ], 
  function (Marionette, HeaderSignUp, BodySignUpAddStudent, Footer, User){
    "use strict";

    var AppSignUpAddStudent = new Marionette.Application();

    // app.bindTo(todoList, 'all', function() {
    //   if (todoList.length === 0) {
    //     app.main.$el.hide();
    //     app.footer.$el.hide();
    //   } else {
    //     app.main.$el.show();
    //     app.footer.$el.show();
    //   }
    // });

    AppSignUpAddStudent.addRegions({
      headerSignUp : '#headerSignUp',
      bodySignUpAddStudent   : '#bodySignUpAddStudent',
      footer : '#footer'
    });

    AppSignUpAddStudent.addInitializer(function(){

      var viewOptions = {
        // collection : todoList
      };

      AppSignUpAddStudent.headerSignUp.show(new HeaderSignUp(viewOptions));
      AppSignUpAddStudent.bodySignUpAddStudent.show(new BodySignUpAddStudent(viewOptions));
      AppSignUpAddStudent.footer.show(new Footer(viewOptions));

    });

    return AppSignUpAddStudent;

});
