'use strict';

angular.module('resumeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('grid', {
        url: '/grid',
        templateUrl: 'app/grid/grid.html',
        controller: GridCtrl,
        controllerAs: 'gridCtrl'
      })
  })
