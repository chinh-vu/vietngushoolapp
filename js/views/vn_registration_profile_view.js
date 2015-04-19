define([
	'jquery',
  'underscore',
  'backbone',
  'backgrid',
	'marionette',
	'templates',
	'views/vn_registration_profile_address_view',
 	'views/vn_registration_profile_commands_view',
  'collections/account_profiles',
  'models/account_profile',
  'app'
], function ($, _, Backbone, Backgrid, Marionette,templates, RegistrationProfileAddressView,
    RegistrationProfileCommandsView, AccountProfiles, AccountProfile, App) {
        var AccountProfiles = new AccountProfiles();
        AccountProfiles.add(new AccountProfile({id:1}));
        AccountProfiles.add(new AccountProfile({id:2}));
        AccountProfiles.add(new AccountProfile({id:3}));
        AccountProfiles.add(new AccountProfile({id:4}));

        console.log(accountProfiles);

        var gridView = new Backgrid.Grid({
          columns : [
          {
            name : "id",
            editable : false,
            renderable: false,
            cell : "string"
          },
          {
            name : "firstName",
            cell : "string",
            label : "First Name"
          },
          {
            name : "middleName",
            cell : "string",
            label : "Middle Name"

          },
          {
            name : "lastName",
            cell : "string",
            label : "Last Name"
          },
          {
            name : "dob",
            cell : "string",
            label : "DOB"
          },
          {
            name : "gender",
            cell : Backgrid.SelectCell.extend({
              optionValues : [ [ "Male", "m" ], [ "Female", "f" ] ]
            }),
            label : "Gender"
          },
          {
            name : "phoneNbr",
            cell : "string",
            label : "Phone Number"
          },
          {
            name : "email",
            cell : "string",
            label : "Email"
          },
          {
            name : "memberType",
            cell : Backgrid.SelectCell.extend({
              optionValues : [ [ "Parent/Guardian", "true" ],
                  [ "Student", "false" ] ]
            }),
            label : "Parent/Guardian"
          }
        ],
          collection : accountProfiles
        });
})