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

function educationController($stateParams, $http, $scope, socket, Modal) {
  this.$http = $http;
  this.socket = socket;
  this.educationList = [];
  this.education = {};
  //get all the records

  /*          this.myData = [
   {
   "institution": "Advanced Auto Parts",
   "fieldOfStudy": "3633 S 9th St",
   "fsStartDate": "Salina",
   "fsFinishDate": "KS",
   "certTitle": "67401"
   }, {
   "institution": "Arrow Speed Shop",
   "fieldOfStudy": "686 S Adams",
   "fsStartDate": "Kansas City",
   "fsFinishDate": "KS",
   "certTitle": "66105"
   } ];*/

  this.$http.get('/api/educations')
    .then(response => {
      this.educationList = response.data;
      this.socket.syncUpdates('education', this.educationList);
      console.info("StatParams: (eduCtrl)");
      console.dir($stateParams);
      console.info("Education (eduCtrl) = ");
      console.dir(this.educationList);
      console.log(this.educationList)
    });
  this.deleteEdu = Modal.confirm.delete(education => {
    this.$http.delete('/api/educations/' + education._id);
  });

  this.showEduX = function (edu) {
    this.$http.get('/api/educations/' + edu._id)
      .then(response => {
        this.education = response.data;
      });
    Modal.edit.editShow(this.education);
  };
  this.showEdu = Modal.edit.editShow(education => {
    if (education._id) {
      this.$http.put('/api/educations/' + education._id, education);
      console.log(education);
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
      console.log(education);
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
  /*          (edu => {
   this.$http.get('/api/educations/' + edu._id)
   .then(response => {this.education=response.data;});
   });*/
  this.updateEdu = function (edu) {
    if (edu._id) {
      this.$http.put('/api/educations/' + edu._id, edu);
      console.log(edu);
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
  /*          this.look = Modal.test.test1();
   console.info("this.openModal");
   console.log(this.openModal);

   /!*function(edu) {
   this.education = edu;
   this.whot = confirm('got it');
   console.log(this.education);

   console.log("modal.test.test1 results: " + " end2");
   };*!/!*/


  console.info($stateParams);
};



