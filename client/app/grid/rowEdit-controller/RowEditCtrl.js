'use strict';

angular.module('resumeApp')
  .controller('RowEditCtrl', RowEditCtrl)
  .service('RowEditor', RowEditor);

RowEditor.$inject = ['$rootScope', '$uibModal'];

function RowEditor($rootScope, $uibModal) {
  var service = {};
  service.editRow = editRow;

  function editRow(grid, row, updateFn) {
    console.log("editRow b4 resolve - updateFn");
    console.log(updateFn);
    $uibModal.open({
      templateUrl: 'app/grid/edit-modal.html',
      controller: ['$scope', '$uibModalInstance', 'grid', 'row', 'updateFn', '$http', 'gridParms', RowEditCtrl ],
      controllerAs: 'editRow',
      resolve: {
        grid: function () {
          return grid;
        },
        row: function () {
          return row;
        },
        updateFn: function () {
            console.log('resolve updateFn');
            console.log(updateFn);
          return updateFn;
        }
      }
    });
  }

  return service;
}

function RowEditCtrl($scope, $uibModalInstance, grid, row, updateFn, $http, gridParms) {
  this.$http = $http;
  this.schema = gridParms.parms.formSchema; //xDRY pass in as variable
  this.entity = angular.copy(row.entity);
  //todo - add form validation
  this.form = gridParms.parms.form; //xDRY move the edit form array to another file and pass in as variable
  this.save = save;


  function save(form) {
    // First we broadcast an event so all fields validate themselves
    $scope.$broadcast('schemaFormValidate');
    // Then we check if the form is valid
    this.updateEdu = updateFn;  //gridDRY - change the variable name to update and create update function for each collection
    console.log("RowEditCtrl.save - updateFn")
    console.log(updateFn);
    if (form.$valid) {
      console.log("valid")
      if (row.entity.id == '0') {
        console.log(row.entity);

        console.log("passed updateEdu");
        row.entity = angular.extend(row.entity, this.entity);
        //real ID come back from response after the save in DB
        row.entity.id = Math.floor(100 + Math.random() * 1000);
        this.updateEdu(row.entity); //gridDRY - change to update funtion
        grid.data.push(row.entity);

      } else {
        console.log(this.updateEdu);
        this.updateEdu(row.entity);  //gridDRY - change to update function
        row.entity = angular.extend(row.entity, this.entity);
        /*
         * $http.post('http://localhost:8080/service/save', row.entity).success(function(response) { $modalInstance.close(row.entity); }).error(function(response) { alert('Cannot edit row (error in console)'); console.dir(response); });
         */
      }

      $uibModalInstance.close(row.entity);
    }
/*    function updateEdu(edu) { //gridDRY - move updateEdu out to a callable function
      if (edu._id) {
        this.$http.put('/api/educations/' + edu._id, edu);
        console.log("updateEdu");
      } else {
        if (edu.institution) {
          console.log("edu.institution " + edu.institution);
          console.log(edu);
          this.$http.post('/api/educations', {
            institution: edu.institution,
            fieldOfStudy: edu.fieldOfStudy,
            fsStartDate: edu.fsStartDate,
            fsFinishDate: edu.fsFinishDate,
            certTitle: edu.certTitle,
            sortOrder: edu.sortOrder

          });
          console.log("got into post");
        }
      }

    };*/
  }
}
