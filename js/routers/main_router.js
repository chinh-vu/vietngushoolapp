define([
	'marionette',
	'app',
  'backbone',
  'backgrid',
  
  'views/home', 
  
  //----- ADMISSION-----------
	'views/register_view',
  'models/account_profile',

  //----- REGISTRATION
  'views/vn_registration_layout_view',

  //------- ADDRESSES ---------
  'collections/households',
  'models/household',
  'backgrid.object.cell'

//  'views/vn_registration_list'

],function(
    Marionette, 
    App, 
    Backbone, Backgrid, 
    Home, 
  
    //-------------- ADMISSION
    Register,
    StudentProfile,

    //-------------- REGISTRATION
    RegistrationLayoutView,

    //-------------- ADDRESSES
    HouseHoldCollection,
    HouseHold
    // RegistrationList
  ) {
  'use strict';

  return Marionette.AppRouter.extend({
    
    initialize: function(options){
    // App.initialize();
		},

    routes : {
      ''                          : 'home',
      'register'                  : 'register',
      'HouseHoldProfile/:id'      : 'register',

      'admision'                  : 'register1',
      'class/:id'                 : 'register',
     
      'participant/add'           : 'addUserProfile',
      'participant/search'        : 'searchUser',
      'participant/:id'           : 'participantDetail'
    },

    home : function(param) {
    	// this.mainRegion.show(new Home());
    	App.header.currentView.select('home-menu');
    	if (!this.homeView) {
    		this.homeView = new Home();
    	}
    	App.main.show(this.homeView);
    },

    register : function(id) {
      App.header.currentView.select('register-menu');
      
      var household = new HouseHold();    
      console.log('id: ', id);
      if(id===null) {
        household = new HouseHold();
        
        console.log('address is: ', JSON.stringify(household));
      } else {
        household = new HouseHold({id: id});
        var defer = $.Deferred();        
        setTimeout(function(){
          household.fetch({
            success: function(data){
              defer.resolve(data);
              console.log("okie ", JSON.stringify(household));
              App.vent.trigger('account:profiles', household.get('profiles'));
              //account:profiles
            }
          });
        }, 2000);
        defer.promise();
      }
      
      var registrationLayoutView = new RegistrationLayoutView({model:household});
      registrationLayoutView.render();
      
      console.log("about to show the registration page ",  JSON.stringify(household));
      App.main.show(registrationLayoutView);
    },

    register1 : function(param) {
    	var that = this;
    	App.header.currentView.select('admision');

      var households = new HouseHoldCollection();
      var defer = $.Deferred();
      setTimeout(function(){
        households.fetch({
          success: function(data){
            defer.resolve(data);
          }
        });
       }, 2000);
      defer.promise();

      console.log("addresses: ", JSON.stringify(households));
      var DeleteCell = Backgrid.Cell.extend({
        template: _.template('<button>Delete</button>'),
        events: {
          "click": "deleteRow"
        },
        deleteRow: function (e) {
          console.log("Hello");
          e.preventDefault();
          this.model.collection.remove(this.model);
        },
        render: function () {
          this.$el.html(this.template());
          this.delegateEvents();
          return this;
      }});
      
      // Children cell - edit as grid in modal dialog
      var ProfilesCell = Backgrid.Extension.ArrayObjectCell.extend({
        formatter: {
          fromRaw: function(array) {
            return _.map(array, function(object) {
              return object.firstName + ", " + object.lastName + " (" + (!_.isEmpty(object.dob)?object.dob:"n/a") + ")"
            }).join(", ");
          }
        },
        gridOptions: {
          className: "backgrid table-bordered",
          columns: [
            {name: "firstName", label: "First Name", cell: "string"},
            {name: "lastName", label: "Last Name", cell: "string"},
            {name: "dob", label: "Date of birth", cell: "string"}
          ]
        }
      });

      var columns = [
        {
          name : "id",
          editable : false,
          renderable: false,
          cell : "string"
        },
        {
          name : "houseHold",
          cell : "string",
          label : "House Hold"
        },
        {
          name : "line1",
          cell : "string",
          label : "Address Line 1"
        },
        {
          name : "profiles",
          cell : ProfilesCell,
          label : "Profiles"

        },
        {
          name : "primaryPhoneNbr",
          cell : "string",
          label : "Primary Phone"
        },
        {
          name : "secondaryPhoneNbr",
          // cell : "string",
          cell: DeleteCell,
          label : "Secondary Phone"
        }
      ];
      var ClickableRow = Backgrid.Row.extend({
          events: {
              "click": "onClick"
          },
          onClick: function (e) {
            Backbone.history.navigate('/HouseHoldProfile/' + this.model.get('id'), {trigger: true});
          }
      });
      var registrationListView = new  Backgrid.Grid({ 
          // className: "table table-bordered table-hover sorter",     
          collection : households,
          columns : columns,
          row: ClickableRow
      });

      App.main.show(registrationListView);
    },

    showClass : function(id) {
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
            label : "Email",
          },
          {
            name : "paid",
            cell : "string",
            label : "paid",
          }
        ];
    },
  });
});


        // address.fetch(
        //   {
        //           error: function () {
        //               console.log("error!!"); 
        //           }
        //       },
        //       {
        //           success: function () {
        //               console.log("no error"); 
        //           }
        //       }
        // );

        
        // var defer = $.Deferred();
        //     setTimeout(function(){
        //       address.fetch({
        //         success: function(address){
        //           defer.resolve(address);
        //         }
        //       });
        //      }, 2000);
        //     defer.promise();

        // console.log('NULL address is: ', JSON.stringify(address));