/*global define*/

define(['marionette','templates'], function (Marionette,templates) {
  "use strict";

  return Marionette.ItemView.extend({
    template : templates.tplHeader,

    select: function(item) {
      $('.nav li').removeClass('active');
      $('.' + item).addClass('active');
    }
  });
});


