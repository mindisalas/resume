'use strict';

angular.module('resumeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('personInfo', {
        url: '/personInfo/:personInfoId',
        templateUrl: 'components/grid/grid.html',
        controllerAs: 'personInfoCtrl',
        controller: personInfoController
      })
  })

  .controller('personInfoController', personInfoController)


function personInfoController($stateParams, $http, $scope, socket, Modal, gridParms, personInfoParms) {
  this.$http = $http;
  this.socket = socket;
  this.personInfoList = [];
  this.personInfo = {};
  this.gridParms = gridParms;
  this.gridParms.parms = personInfoParms.parms;
  //get all the records


  this.$http.get('/api/personInfos')
    .then(response => {
      this.personInfoList = response.data;
      this.socket.syncUpdates('personInfo', this.personInfoList);

    });
  this.deletePersonInfo = Modal.confirm.delete(personInfo => {
    this.$http.delete('/api/personInfos/' + personInfo._id);
  });

  this.showPersonInfo = Modal.edit.editShow(personInfo => {
    if (personInfo._id) {
      this.$http.put('/api/personInfos/' + personInfo._id, personInfo);

    } else {
      if (personInfo.institution) {
        this.$http.post('/api/personInfos', {
          institution: personInfo.institution
        });
        this.newPersonInfoInstitution = '';
      }
    }
  });
  this.addPersonInfo = Modal.edit.editShow(personInfo => {
    if (personInfo._id) {
      this.$http.put('/api/personInfos/' + personInfo._id, personInfo);

    } else {
      if (personInfo.institution) {
        this.$http.post('/api/personInfos', {
          institution: personInfo.institution,

        });
        this.newPersonInfoInstitution = '';

      }
    }
  });
  this.updatePersonInfo = function (personInfo) {
    if (personInfo._id) {
      this.$http.put('/api/personInfos/' + personInfo._id, personInfo);

    } else {
      if (personInfo.institution) {
        this.$http.post('/api/personInfos', {
          institution: personInfo.institution
        });
        this.newPersonInfoInstitution = '';
      }
    }

  };

};

