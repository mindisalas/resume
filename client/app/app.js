'use strict';

angular.module('resumeApp', ['resumeApp.auth', 'resumeApp.admin', 'resumeApp.constants',
  'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io', 'ui.router', 'ui.bootstrap',
  'validation.match', 'schemaForm', 'ngTouch', 'ui.grid', 'ui.grid.edit', 'ui.grid.selection',
  'ui.grid.exporter', 'ngAnimate', 'ui.grid.rowEdit', 'ui.grid.cellNav'
])
  .config(function ($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });


