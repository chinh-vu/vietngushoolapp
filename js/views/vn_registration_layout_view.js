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
  'models/address',
  'app'
], function ($, _, Backbone, Backgrid, Marionette,templates, RegistrationProfileAddressView,
    RegistrationProfileCommandsView, AccountProfiles, AccountProfile, Address, App) {
  "use strict";

  return Marionette.LayoutView.extend({
    template : templates.tplRegistrationLayout,

    regions : {
		registrationAddressRegion : 		        '#profile-address-region',
		registrationProfilesCollectionRegion :  '#profiles-collection-region',
		registrationCommandsRegion : 		        '#commands-region'
	},

  initAccountProfiles : function() {
    var accountProfiles = new AccountProfiles();
    for(i=0; i<10; i++) {
      accountProfiles.add(new AccountProfiles());
    }

  console.log(accountProfiles);
    return accountProfiles;
  },

	onBeforeShow: function() {
      // var address = new Address();

      var registrationProfileAddressView = new RegistrationProfileAddressView({model:this.model});

      var tmpAccountProfiles;
      if(!this.model) {
        tmpAccountProfiles = this.model.get('profiles');
        console.log('----- address ', JSON.stringify(tmpAccountProfiles));
      }
    	this.getRegion('registrationAddressRegion').show(registrationProfileAddressView);
      
    	this.getRegion('registrationCommandsRegion').show(new RegistrationProfileCommandsView());

      var gradeArray = [ ["Select One", ""], [ "Kindergarten", "K" ], [ "1A", "1A" ], [ "1B", "1B" ], [ "1C", "1C" ], [ "2A", "2A" ] ];
      var memberTypeArray = [ [ "Parent/Guardian", "parent_guardian" ], [ "Student", "student"] ];
      var paidArray = [ [ "Not Paid", "notpaid" ], [ "Paid", "paid"] ];
      var paidCell = Backgrid.Extension.ObjectCell.extend({
        formatter: {
          fromRaw: function(object) {
            if (object) {
              return _.compact([
                object.schoolFee ? "Fee: " + object.schoolFee : null,
                object.donation ? "Donation: " + object.donation : null,
                object.suggestedGrade ? "Sug. Grade: " + object.suggestedGrade : null,
                object.startDate ? "Start Date: " + object.startDate : null
              ]).join(", ");
            } else {
              return "Not Paid"
            }
          }
        },
        schema: [
          {name: "schoolFee", label: "School Fee"},
          {name: "donation", label: "Donation"},
          {name: "suggestedGrade", label: "Sug. Grade"},
          {name: "startDate", label: "Start Date"}
        ]
      });
      var columns = [
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
          // {
          //   name : "gender",
          //   cell : Backgrid.SelectCell.extend({
          //     optionValues : [ [ "Male", "m" ], [ "Female", "f" ] ]
          //   }),
          //   label : "Gender"
          // },
          // {
          //   name : "phoneNbr",
          //   cell : "string",
          //   label : "Phone Number"
          // },
          {
            name : "email",
            cell : "string",
            label : "Email"
          },
          {
            name : "memberType",
            cell : Backgrid.SelectCell.extend({
              optionValues : memberTypeArray
            }),
            label : "Parent/Guardian"
          },
          {
            name : "grade",
            cell : Backgrid.SelectCell.extend({
              optionValues : gradeArray
            }),
            label : "Grade"
          },
          /*{
            name : "paid",
            cell : Backgrid.SelectCell.extend({
              optionValues : paidArray
            }),
            label : "Paid"
          },*/
          {
            name : "paid",
            cell : paidCell,
            label : "Paid"
          },
          {
            name : "schoolYear",
            cell : "string",
            label : "School Year"
          }

        ];

      var accountProfiles = new AccountProfiles();
      // accountProfiles.add(new AccountProfile({id:1}));
      var d = new Date();
      for(var i=0; i<6; i++) {
        // d = new Date();
        // accountProfiles.add(new AccountProfile({id:d.getTime()}));        
        var aProfile = new AccountProfile();
        aProfile.set('id', aProfile.get('cid'));
        accountProfiles.add(aProfile); 

        console.log('id ', JSON.stringify(aProfile));
      }

      var gridView = new Backgrid.Grid({
        columns : columns,
        collection : accountProfiles
      });
      
      this.getRegion('registrationProfilesCollectionRegion').show(gridView);

      gridView.listenTo(App.vent, 'account:profiles', function(data) {
        accountProfiles.reset();

        console.log('data.length ', data.length);
        if(data.length < 4) {
          for(var i=0; i < data.length; i++) {
            console.log('okie gridview received event ', data[i]);
            accountProfiles.add(new AccountProfile(data[i]));
          }
        }
        if(data.length < 6) {
          for(var i=data.length; i < 6; i++) {
            d = new Date();
            accountProfiles.add(new AccountProfile({id:d.getTime()}));        
          }
        }

        console.log('account profiles : ', JSON.stringify(accountProfiles));
         
        
      });
      registrationProfileAddressView.listenTo(App.vent, 'registration:complete:submit', function() {
        var self = this;

        console.log('------------------- Received event registration:complete:submit');
        var data = Backbone.Syphon.serialize(self);

        //console.log('address ', JSON.stringify(self.model));
        //console.log('data: ', JSON.stringify(data));
        //console.log('App.user.login', App.user.credentials.username);

        var _profiles = accountProfiles.toJSON();
        data = {"householdContact": data, "profiles": _profiles};
        console.log('data: ', JSON.stringify(data));

        self.model.save(data, {
          silent: false,
          sync: true,
          success:function(model, resp, opt){
            console.log(' ---------------------- success', resp);

            for (var i = 0; i < accountProfiles.length; i++) {
              var prof = accountProfiles.at(i);
              if(prof.isValidUserProfile()) {
                var firstName = prof.get('firstName');
                var lastName = prof.get('lastName');
                prof.set('houseHoldProfileId', self.model.get('id'));
                prof.set('year', '2015-2016');
                prof.save();
                console.log(firstName + ', ' + lastName);
              }
            } //  end of for(var i=0; i<studentProfiles.length; i++)

          }, error:function(model, resp, opt){
            console.log(' ---------------------- error', resp);
          }, wait:true
        });
        // App.vent.trigger('registration:address:submit', data);
        
        console.log('saved address ', JSON.stringify(self.model));

        if(!self.model && !accountProfiles) self.model.set('profiles', accountProfiles);
        else console.log('profile is null');

        console.log('onBeforeShow: ', self.model);
        // console.log('url ', data.urlRoot());

      }, this);

  	}
  });
})