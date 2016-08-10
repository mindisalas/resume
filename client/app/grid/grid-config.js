'use strict';

angular.module('resumeApp')


//var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.edit', 'ui.grid.selection', 'ui.grid.exporter',
//'ngAnimate', 'ui.bootstrap', 'schemaForm']);


  .config(function($stateProvider) {
    $stateProvider
      .state('grid', {
        url: '/grid',
        templateUrl: 'app/grid/grid.html',
        controller: GridCtrl,
        controllerAs: 'vmxWhot'
      })})
