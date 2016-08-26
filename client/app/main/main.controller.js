'use strict';

(function () {

  class MainController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.educationList = [];
      this.skillList = [];


      $scope.$on('$destroy', function () {
        socket.unsyncUpdates('education');
        socket.unsyncUpdates('skill');
        return console.log("destroy - socket.unsyncUpdates"); //todo remove the console log here
      });
    }

    $onInit() {
      this.$http.get('/api/educations')
        .then(response => {
          this.educationList = response.data;
          this.socket.syncUpdates('education', this.educationList);
        });
      this.$http.get('/api/skills')
        .then(response => {
          this.skillList = response.data;
          this.socket.syncUpdates('skill', this.skillList);
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
