'use strict';

angular.module('resumeApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('education', {
        url: '/education/:educationId',
        templateUrl: 'app/education/education.html',
        controller: function($stateParams,$http, $scope, socket) {
          this.$http = $http;
          this.socket = socket;
          this.educationList = [];
          this.education = {};
          //get all the records
          this.$http.get('/api/educations')
            .then(response => {
              this.educationList = response.data;
              this.socket.syncUpdates('education', this.educationList);
              console.log("StatParams: " + $stateParams + ", Education = " + this.educationList);
              console.log(this.educationList)
            });
          this.deleteEdu = function(edu) {
            this.doIt = confirm("Are you sure you want to delete " + edu.institution + " from the Education list?");
            console.log(this.doIt);
            if (this.doIt) {
              this.$http.delete('/api/educations/' + edu._id)
              return console.log("got to deleteEdu //todo"); //todo remove the console log here
            }
          };
          this.confirmTest = function() {
            this.whot = confirm('got it');
            console.log(this.whot);
          };
          this.showEdu = function(edu) {
           this.$http.get('/api/educations/' + edu._id)
             .then(response => {this.education=response.data;});
          };
          this.updateEdu = function(edu) {
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


          console.info($stateParams);
        },
        controllerAs: 'eduCtrl'
      });
  });
