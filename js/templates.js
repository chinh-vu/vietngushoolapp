define(function (require){
  "use strict";
  return {
    tplHome                : require('tpl!templates/home.html'),
    tplHeader              : require('tpl!templates/header.html'),
    tplFooter              : require('tpl!templates/footer.html'),
    tplRegister            : require('tpl!templates/register.html'),   
    //  registration templates
    tplRegistrationLayout             : require('tpl!templates/vn_registration.html'),
    tplRegistrationProfileAddress     : require('tpl!templates/vn_registration_profile_address.html'),
    tplRegistrationProfileCommands    : require('tpl!templates/vn_registration_profile_commands.html'),
    // signUp templates
    tplHeaderSignUp              : require('tpl!templates/headerSignUp.html'),
    tplBodySignUp           : require('tpl!templates/bodySignUp.html'),
    tplAddAccountLayout     : require('tpl!templates/addAccountLayout.html'),
    tplAddAccount           : require('tpl!templates/addAccount.html'),
    tplBodySignUpAddSpouse  : require('tpl!templates/bodySignUpAddSpouse.html'),
    tplBodySignUpAddStudent  : require('tpl!templates/bodySignUpAddStudent.html'),
    tplBodySignUpAddTuition  : require('tpl!templates/bodySignUpAddTuition.html')
  };
});
