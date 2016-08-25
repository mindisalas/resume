'use strict';

angular.module('resumeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('education', {
        url: '/education/:educationId',
        templateUrl: 'app/education/education.html',
        controllerAs: 'eduCtrl',
        controller: educationController
      })
  })

  .controller('educationController', educationController)


function educationController($stateParams, $http, $scope, socket, Modal, gridParms, educationParms) {
  this.$http = $http;
  this.socket = socket;
  this.educationList = [];
  this.education = {};
  this.gridParms = gridParms;
  this.gridParms.parms = educationParms.parms;
  //get all the records


  this.$http.get('/api/educations')
    .then(response => {
      this.educationList = response.data;
      this.socket.syncUpdates('education', this.educationList);

    });
  this.deleteEdu = Modal.confirm.delete(education => {
    this.$http.delete('/api/educations/' + education._id);
  });

  this.showEdu = Modal.edit.editShow(education => {
    if (education._id) {
      this.$http.put('/api/educations/' + education._id, education);

    } else {
      if (education.institution) {
        this.$http.post('/api/educations', {
          institution: education.institution,
          fieldOfStudy: education.fieldOfStudy,
          fsStartDate: education.fsStartDate,
          fsFinishDate: education.fsFinishDate,
          certTitle: education.certTitle
        });
        this.newEduInstitution = '';
        this.newEduFofS = '';
        this.newEduStart = '';
        this.newEduFinish = '';
        this.newEduCert = ''
      }
    }
  });
  this.addEdu = Modal.edit.editShow(education => {
    if (education._id) {
      this.$http.put('/api/educations/' + education._id, education);

    } else {
      if (education.institution) {
        this.$http.post('/api/educations', {
          institution: education.institution,
          fieldOfStudy: education.fieldOfStudy,
          fsStartDate: education.fsStartDate,
          fsFinishDate: education.fsFinishDate,
          certTitle: education.certTitle
        });
        this.newEduInstitution = '';
        this.newEduFofS = '';
        this.newEduStart = '';
        this.newEduFinish = '';
        this.newEduCert = ''
      }
    }
  });
  this.updateEdu = function (edu) {
    if (edu._id) {
      this.$http.put('/api/educations/' + edu._id, edu);

    } else {
      if (edu.institution) {
        this.$http.post('/api/educations', {
          institution: edu.institution,
          fieldOfStudy: edu.fieldOfStudy,
          fsStartDate: edu.fsStartDate,
          fsFinishDate: edu.fsFinishDate,
          certTitle: edu.certTitle
        });
        this.newEduInstitution = '';
        this.newEduFofS = '';
        this.newEduStart = '';
        this.newEduFinish = '';
        this.newEduCert = ''
      }
    }

  };

};

