'use strict';

angular.module('resumeApp.auth', ['resumeApp.constants', 'resumeApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
