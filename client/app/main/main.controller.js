'use strict';

(function () {

  class MainController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.personInfoList = [];
      this.skillList = [];
      this.jobList = [];
      this.educationList = [];

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('personInfo');
        socket.unsyncUpdates('skill');
        socket.unsyncUpdates('job');
        socket.unsyncUpdates('education');
        return console.log("destroy - socket.unsyncUpdates"); //todo remove the console log here
      });
    }

    $onInit() {
      this.$http.get('/api/personInfos')
        .then(response => {
          this.personInfoList = response.data;
          this.socket.syncUpdates('personInfo', this.personInfoList);
        });
      this.$http.get('/api/skills')
        .then(response => {
          this.skillList = response.data;
          this.socket.syncUpdates('skill', this.skillList);
        });
      this.$http.get('/api/jobs')
        .then(response => {
          this.jobList = response.data;
          this.socket.syncUpdates('job', this.jobList);
        });
      this.$http.get('/api/educations')
        .then(response => {
          this.educationList = response.data;
          this.socket.syncUpdates('education', this.educationList);
        });
      return console.log("got to init of edu and skills"); //todo remove the console log here
    }
  }

  angular.module('resumeApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
      //controllerAs: 'eduMain'
    });
})();
