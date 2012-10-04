'use strict';
/*
 * The configuration file for require.js holds all dependency declarations for
 * the application. This is the first file, that will be loaded by require.js
 * and it holds a reference to the main.js file, that starts the app itself.
 */
require.config({

  // deps holds dependencies to load as soon as require is defined.
  deps: ['main'],

  // Paths that contain the various different javascript files.
  paths: {

    // The libs folder contains all javascript libraries the app depends on.
    libs: '../assets/js/libs',

    // The plugins folder contains library plugins such as jquery.cookie.
    plugins: '../assets/js/plugins',

    // Library paths.
    jquery: '../assets/js/libs/jquery',
    underscore: '../assets/js/libs/lodash',
    backbone: '../assets/js/libs/backbone',
    marionette: '../assets/js/libs/backbone.marionette'
  },

  /*
   * Configure the dependencies and exports for older, traditional
   * "browser globals" scripts that do not use define() to declare the
   * dependencies and set a module value.
   */
  shim: {

    // Backbone depends on both jquery and underscore. Backbone is available
    // as the 'Backbone' object in the window namespace.
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },

    // marionette.async needs to be loaded after marionette was loaded.
    'plugins/backbone.marionette.async': {
      deps: ['marionette']
    }
  }

});