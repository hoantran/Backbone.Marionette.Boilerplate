/*
 * The router defines routes and their corresponding methods in the controller.
 */
/*jslint browser: true*/
define([

  // Libraries.
  'backbone',
  'marionette',

  // Modules.
  'controller'
  
], function(Backbone, Marionette, controller) {
  'use strict';

  var Router = Backbone.Marionette.AppRouter.extend({

    appRoutes: {

      '' : 'index'

    }

  });

  return new Router({
    controller: controller
  });

});