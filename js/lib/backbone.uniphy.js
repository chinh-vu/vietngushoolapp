// Backbone Uniphy v0.1.0
// Extends backbone views for use with the Uniphy portal.
// Copyright 2014 Healthcare Engagement Solutions
// Nate Armagost
;(function(root, factory) {
    // Set up Backbone appropriately for the environment.
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore', 'backbone'], function(_, Backbone) {
            // Use global variables if the locals are undefined.
            return factory((_ || root._), (Backbone || root.Backbone));
        });
     } else {
        // RequireJS isn't being used. Assume underscore and backbone are loaded in <script> tags
        factory(_, Backbone);
     }
}(this, function(_, Backbone) {

    var $ = Backbone.$;

    Backbone.View = Backbone.View.extend({

        // Renders a view and calls onShow when finished
        reRender: function (options) {

            this.render(options);
            if (this.onShow) {
                this.onShow(options);
            }

        },

        trackStatus: function (userId, view) {

            require(['app', 'jst'], function(App) {

                // var // $status = $(view.el).find('.status'), // Status div element // Can't cache the $status because we need to re-find() the status div if the view was re-rendered between status updates
                var partial = JST['contactStatusPartial']; // Status partial template

                if (App.contactsController.contacts.getContactByUserId(userId)) { // Make sure the user id exists just in case this is an industry news item
                    view.listenTo(App.contactsController.contacts.getContactByUserId(userId), 'change:status', function () {

                        $(view.el).find('.status').html(partial({ contact: App.contactsController.contacts.getContactByUserId(userId).toJSON() }));

                    });
                }

            });

        },

        trackInformation: function (userId, view) {

            require(['app', 'jst'], function(App) {

                if (App.contactsController.contacts.getContactByUserId(userId)) { // Make sure the user id exists just in case this is an industry news item
                    view.listenTo(App.contactsController.contacts.getContactByUserId(userId), 'change:displayName change:title', function () {

                        $(view.el).find('.name').html(App.contactsController.contacts.getContactByUserId(userId).get('displayName'));
                        $(view.el).find('.title').html(App.contactsController.contacts.getContactByUserId(userId).get('title'));

                    });
                }

            });

        },

        // Lazy loads a collection inside a .lazy-loader selector
        lazyLoad: function($scroll) {

            var that = this;

            // Really should only be the case on the first call - Checks the length vs. the limit (called on sync). If the length is less than the limit, remove the lazy loader and unbind
            if (this.collection.length < this.collection.options.limit) {

                this.unLazyLoad($scroll);

            // Really should only be on the first call so set up scroll listening if the collection length matches the limit
            } else if (this.collection.length >= this.collection.options.limit) {

                $(this.el).find('.lazy-loader').removeClass('hide');

                require(['app'], function(App) {

                    $scroll.on('scroll', function () {

                        // Begin the collection fetch if the user just above the lazy loader icon
                        if (($scroll.scrollTop() >= $scroll[0].scrollHeight - $scroll[0].clientHeight - $scroll.find('.lazy-loader')[0].clientHeight) && (!$(that.el).data('fetching'))) {

                            // About to fetch so lock it down
                            $(that.el).data('fetching', true);

                            //that.collection.options.offset = that.collection.options.offset + that.collection.options.limit;

                            that.collection.options.offset = that.collection.length;

                            if (!that.collection.options.hasOwnProperty('text')) {

                                setTimeout(function () {

                                    that.collection.fetch({

                                        data: that.collection.options,
                                        remove: false,
                                        success: function(collection, response) {

                                            if (response.length < that.collection.options.limit) {

                                                $(that.el).find('.lazy-loader').addClass('hide');
                                                that.unLazyLoad($scroll);

                                            }

                                            $(that.el).data('fetching', false);

                                        },
                                        error: function () {}
                                    });

                                }, 500);

                            } else {

                                setTimeout(function () {

                                    that.collection.fetch({
                                        type: 'POST',
                                        contentType: 'application/json',
                                        dataType: 'json',
                                        data: JSON.stringify({
                                            "limit": that.collection.options.limit,
                                            "offset": that.collection.options.offset,
                                            "text": that.collection.options.text,
                                            "filter": that.collection.options.filter
                                        }),
                                        remove: false,
                                        success: $.proxy(function(collection, response) {

                                            if (response.contentSummarySet.length < that.collection.options.limit) {

                                                $(that.el).find('.lazy-loader').addClass('hide');
                                                that.unLazyLoad($scroll);

                                            }

                                            $(that.el).data('fetching', false);

                                        }, this)

                                    });

                                }, 500);

                            }

                        }
                    });

                });

            }

        },

        unLazyLoad: function($scroll) {

            $(this.el).find('.lazy-loader').addClass('hide');
            $scroll.removeData('fetching');
            $scroll.removeData('lazy');
            $scroll.off('scroll');

        },

        stretch: function () {

            $(this.el).find('.stretch').each(function () {

                // Create the stretch element's position
                var $stretch = $(this), stretchtop = 0;
                $stretch.prevAll().each(function() {
                    stretchtop = stretchtop + $(this).outerHeight();
                });
                $stretch.css({ top: stretchtop });
                var stretchbottom = 0;
                $stretch.nextAll(':not(".fader")').each(function() {
                    stretchbottom = stretchbottom + $(this).outerHeight();
                });
                $stretch.css({ bottom: stretchbottom });
                $stretch.find('.stretched').innerHeight($stretch.height());

            });

        },

        preventDefault: function (e) {

            e.preventDefault();

        },

        stopPropagation: function (e) {

            e.stopPropagation();

        },

        focusRedactor: function (e) {

            e.preventDefault();
            e.stopPropagation();

            // Fix for Redactor not popping open the keyboard in mobile Safari. Quickly focus on a hidden button then focus back on the text box.
            this.options.redactor.$focus.focus();
            this.options.redactor.$textarea.redactor('focusEnd');

        },

        openRedactor: function() {

            if (!this.options.redactor.open) {
                this.options.redactor.$textarea.closest('.redactor').removeClass('redactor').addClass('open');
                this.options.redactor.open = true;
                this.stretch();
            }

        },

        closeRedactor: function() {

            if (this.options.redactor.open) {
                this.options.redactor.$textarea.closest('.open').removeClass('open').addClass('redactor');
                this.options.redactor.open = false;
                this.stretch();
            }

        },

    });

}));