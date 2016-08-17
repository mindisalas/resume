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
      controller: ['$scope', '$uibModalInstance', 'eduSchema', 'grid', 'row', '$http', RowEditCtrl],
      controllerAs: 'editRow',
      resolve: {
        grid: function () {
          return grid;
        },
        msg: function () {
          console.dir(grid);
        },
        row: function () {
          return row;
        },
        msg2: function () {
          console.dir(row)
        }
      }
    });
  }

  return service;
}

function RowEditCtrl($scope, $uibModalInstance, eduSchema, grid, row, $http) {
  this.$http = $http;
  this.schema = eduSchema;
  this.entity = angular.copy(row.entity);
  this.form = [{
    'key': 'institution' //changed
  }, {},
    {
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

  this.save = save;


  function save(form) {
    // First we broadcast an event so all fields validate themselves
    $scope.$broadcast('schemaFormValidate');
    // Then we check if the form is valid
    this.updateEdu = updateEdu;
    if (form.$valid) {
      console.log("valid")
      if (row.entity.id == '0') {
        /*
         * $http.post('http://localhost:8080/service/save', row.entity).success(function(response) { $modalInstance.close(row.entity); }).error(function(response) { alert('Cannot edit row (error in console)'); console.dir(response); });
         */
        console.log(row.entity);

        console.log("passed updateEdu")
        row.entity = angular.extend(row.entity, this.entity);
        //real ID come back from response after the save in DB
        row.entity.id = Math.floor(100 + Math.random() * 1000);
        this.updateEdu(row.entity);
        grid.data.push(row.entity);

      } else {
        console.log(row.entity);
        this.updateEdu(row.entity);
        row.entity = angular.extend(row.entity, this.entity);
        /*
         * $http.post('http://localhost:8080/service/save', row.entity).success(function(response) { $modalInstance.close(row.entity); }).error(function(response) { alert('Cannot edit row (error in console)'); console.dir(response); });
         */
      }

      $uibModalInstance.close(row.entity);
    }
    function updateEdu (edu) {
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
            certTitle: edu.certTitle

          });
          console.log("got into post");
/*          this.newEduInstitution = '';
          this.newEduFofS = '';
          this.newEduStart = '';
          this.newEduFinish = '';
          this.newEduCert = ''*/
        }
      }

    };
  }
}
