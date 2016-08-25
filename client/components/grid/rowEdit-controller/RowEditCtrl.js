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
      controller: ['$scope', '$uibModalInstance', 'grid', 'row', '$http', 'gridParms', RowEditCtrl],
      controllerAs: 'editRow',
      resolve: {
        grid: function () {
          return grid;
        },
        row: function () {
          return row;
        }
      }
    });
  }

  return service;
}

function RowEditCtrl($scope, $uibModalInstance, grid, row, $http, gridParms) {
  this.$http = $http;
  this.schema = gridParms.parms.formSchema; //xDRY pass in as variable
  this.entity = angular.copy(row.entity);
  this.parms = gridParms.parms;
  //todo - add form validation
  this.form = this.parms.form; //xDRY move the edit form array to another file and pass in as variable
  this.endPoint = this.parms.endPoint; //xDRY - pass the url for the collection as the group variable
  this.endPointPluralized = this.parms.endPointPluralized; //xDRY - pass the url for the collection as the group variable
  this.save = save;


  function save(form) {
    // First we broadcast an event so all fields validate themselves
    $scope.$broadcast('schemaFormValidate');
    // Then we check if the form is valid
    this.upsert = upsert;  //xDRY - change the variable name to update and create update function for each collection
    if (form.$valid) {

      if (row.entity.id == '0') {
        row.entity = angular.extend(row.entity, this.entity);
        //real ID come back from response after the save in DB
        row.entity.id = Math.floor(100 + Math.random() * 1000);
        this.upsert(row.entity); //xDRY - change to update function
        grid.data.push(row.entity);

      } else {
        this.upsert(row.entity);  //xDRY - change to update function
        row.entity = angular.extend(row.entity, this.entity);
        /*
         * $http.post('http://localhost:8080/service/save', row.entity).success(function(response) { $modalInstance.close(row.entity); }).error(function(response) { alert('Cannot edit row (error in console)'); console.dir(response); });
         */
      }

      $uibModalInstance.close(row.entity);
    }
    function upsert(rowForm) { //xDRY - move upsert out to a callable function
      if (rowForm._id) {
        this.$http.put(this.endPointPluralized + "/" + rowForm._id, rowForm);
      } else {
        if (rowForm.institution) { //gridDRY - validate a field
          this.$http.post(this.endPointPluralized, rowForm);
        }
      }
    };
  }
}
