'use strict';

angular.module('resumeApp')
  .controller('RowEditCtrl', RowEditCtrl)
  .service('RowEditor', RowEditor);

RowEditor.$inject = ['$rootScope', '$uibModal'];

function RowEditor($rootScope, $uibModal) {
  var service = {};
  service.editRow = editRow;

  function editRow(grid, row) {
    $uibModal.open({
      templateUrl: 'app/grid/edit-modal.html',
      controller: ['$scope', '$uibModalInstance', 'eduSchema', 'grid', 'row', RowEditCtrl],
      controllerAs: 'tim',
      resolve: {
        grid: function() {
          return grid;
        },
        msg: function() { console.dir(grid);},
        row: function() {
          return row;
        },
        msg2: function() { console.dir(row) }
      }
    });
  }

  return service;
}

function RowEditCtrl($scope, $uibModalInstance, eduSchema, grid, row) {
  var vm = this;

  vm.schema = eduSchema;
  vm.entity = angular.copy(row.entity);
  vm.form = [{
    'key': 'institution' //changed
  }, {
     'key': 'fieldOfStudy'  //changed
  }, {
    'type': 'section',
    'htmlClass': 'row',
    'items': [{
      'type': 'section',
      'htmlClass': 'col-sm-6',
      'items': [
        'fsStartDate'  //changed
      ]
    }, {
      'type': 'section',
      'htmlClass': 'col-sm-6',
      'items': [
        'fsFinishDate' //changed
      ]
    }]
  }, {
    'type': 'section',
    'htmlClass': 'row',
    'items': [{
      'type': 'section',
      'htmlClass': 'col-sm-6',
      'items': [
        'certTitle'  //changed
      ]
    }]
  }

  ];

  vm.save = save;

  function save(form) {
    // First we broadcast an event so all fields validate themselves
    $scope.$broadcast('schemaFormValidate');
    // Then we check if the form is valid
    if (form.$valid) {
      if (row.entity.id == '0') {
        /*
         * $http.post('http://localhost:8080/service/save', row.entity).success(function(response) { $modalInstance.close(row.entity); }).error(function(response) { alert('Cannot edit row (error in console)'); console.dir(response); });
         */
        row.entity = angular.extend(row.entity, vm.entity);
        //real ID come back from response after the save in DB
        row.entity.id = Math.floor(100 + Math.random() * 1000);

        grid.data.push(row.entity);

      } else {
        row.entity = angular.extend(row.entity, vm.entity);
        /*
         * $http.post('http://localhost:8080/service/save', row.entity).success(function(response) { $modalInstance.close(row.entity); }).error(function(response) { alert('Cannot edit row (error in console)'); console.dir(response); });
         */
      }

      $uibModalInstance.close(row.entity);
    }
  }
}
