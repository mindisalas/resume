'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.awesomeThings = [];
      this.educationList = [];


      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
        socket.unsyncUpdates('education');
        return console.log("destroy - socket.unsyncUpdates"); //todo remove the console log here
      });
    }

    $onInit() {
      this.$http.get('/api/things')
        .then(response => {
          this.awesomeThings = response.data;
          this.socket.syncUpdates('thing', this.awesomeThings);
        });
      this.$http.get('/api/educations')
        .then(response => {
          this.educationList = response.data;
          this.socket.syncUpdates('education', this.educationList);
        });
      return console.log("got to init of ythings and educations //todo");
    }

        addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing,
          info: this.newThingInfo
        });
        this.newThing = '';
        this.newThingInfo = '';
      }
      return console.log("got to add a thing //todo");  //todo remove the console log here
    }

    addEdu() {
      if (this.newEduInstitution) {
        this.$http.post('/api/educations', {
          institution: this.newEduInstitution,
          fieldOfStudy: this.newEduFofS,
          fsStartDate: this.newEduStart,
          fsFinishDate: this.newEduFinish,
          certTitle: this.newEduCert
        });
        this.newEduInstitution = '';
        this.newEduFofS = '';
        this.newEduStart = '';
        this.newEduFinish = '';
        this.newEduCert = ''
      }
      return console.log("got to add a edu //todo"); //todo remove the console log here
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
      return console.log("got to deleteThing //todo"); //todo remove the console log here
    }

    deleteEdu(edu) {
      this.$http.delete('/api/educations/' + edu._id);
      return console.log("got to deleteEdu //todo"); //todo remove the console log here
    }
  }

  angular.module('resumeApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
      //controllerAs: 'eduMain'
    });
})();
