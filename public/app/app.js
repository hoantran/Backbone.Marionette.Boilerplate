/* 
 * 
 */
/*jslint browser: true*/
define([

  // Libraries.
  'jquery',
  'underscore',
  'backbone',
  'marionette',

  // Plugins.
  'plugins/backbone.marionette.async'

], function($, _, Backbone, Marionette) {
  'use strict';

  /*
   * The following will make Marionette's template retrieval work with
   * Marionette.Async. Instead of getting the template from the DOM, it will
   * make use of require.js to async load template files.
   */
  Backbone.Marionette.TemplateCache.prototype.loadTemplate = function(templateId, callback){

    // The templateId is actually the path on the server. Load it using an
    // ajax get request and render the resulting html.
    var url = 'app/templates/' + templateId + '.html';
    $.get(url, function(templateHtml) {

      // Render the template using underscore's basic template rendering.
      var template = _.template(templateHtml);
      callback(template);
    });
  };

  // Creates a new Marionette application. 
  var App = new Marionette.Application();

  // Add the main region, that will hold the page layout.
  App.addRegions({
    regionMain: '#main'
  });

  // Adds any methods to be run after the app was initialized.
  App.addInitializer(function() {
    this.initAppLayout();
  });

  // Start backbone's history for hash navigation after the app was initialized.
  App.on('initialize:after', function() {
    Backbone.history.start({
      pushState: true,
      root: '/sites/studentenflohmarkt-v2/public/'
    });
  })

  // The main initializing function sets up the basic layout and its regions.
  App.initAppLayout = function() {
    var AppLayout = Backbone.Marionette.Layout.extend({
      template: 'layouts/default',
      regions: {
        regionError: '#error', // Contains any error messages.
        regionUserInfo: '#userInfo', // Will contain any user controls (login/logout).
        regionContent: '#content' // Will contain the page content.
      }
    });

    // Inject the main layout into the #main region of the page.
    var layout = new AppLayout();
    App.regionMain.show(layout);

    // All links with the role attribute set to nav-main will navigate through
    // the application's router.
    $('a[role=nav-main]').click(function(e) {
      e.preventDefault();
      App.Router.navigate($(this).attr('href'), {
        trigger: true
      });
    });
  }

  // Returns the app object to be available to other modules through require.js.
  return App;
});