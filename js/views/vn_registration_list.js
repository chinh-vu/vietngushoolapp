define([
	'jquery',
  'underscore',
  'backbone',
  'backgrid',
	'marionette',
	'templates',
  'collections/addresses',
  'models/address',
  'App'
], function ($, _, Backbone, Backgrid, Marionette,templates, Addresses, Address, App) {
     
      var columns = [
      {
        name : "id",
        editable : false,
        renderable: false,
        cell : "string"
      },
      {
        name : "line1",
        cell : "string",
        label : "Address Line 1"
      },
      {
        name : "line2",
        cell : "string",
        label : "Address Line 1"

      },
      {
        name : "city",
        cell : "string",
        label : "City"
      },
      {
        name : "state",
        cell : "string",
        label : "State"
      },
      {
        name : "zipcode",
        cell : "string",
        label : "Zip",
        editable: false,
        cell: Backgrid.BooleanCell.extend({
            render: function () {
                this.$el.empty();
                this.$el.append($("<input>", {
                    tabIndex: -1,
                    type: "checkbox",
                    checked: this.formatter.fromRaw(this.model.get('zipcode')),
                    disabled: true
                }));
                this.delegateEvents();
                return this;
            }
        })
      },
      {
        name : "primaryPhoneNbr",
        cell : "string",
        label : "Primary Phone"
      },
      {
        name : "secondaryPhoneNbr",
        cell : "string",
        label : "Secondary Phone"
      }
    ];
    var RegistrationListView = new  Backgrid.Grid({      
        collection : this.collection,
        columns : columns
    });

    return RegistrationListView;
})