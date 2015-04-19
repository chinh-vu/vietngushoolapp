define(function(require){
  "use strict";
  return {
    tplHome                : require('tpl!templates/home.html'),
    tplHeader              : require('tpl!templates/header.html'),
    tplFooter              : require('tpl!templates/footer.html'),
    tplRegister            : require('tpl!templates/register.html'),   
    //  registration templates
    tplRegistrationLayout             : require('tpl!templates/vn_registration.html'),
    tplRegistrationProfileAddress     : require('tpl!templates/vn_registration_profile_address.html'),
    tplRegistrationProfileCommands    : require('tpl!templates/vn_registration_profile_commands.html')
  };
});