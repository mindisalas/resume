'use strict';

angular.module('resumeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('job', {
        url: '/job/:jobId',
        templateUrl: 'components/grid/grid.html',
        controllerAs: 'jobCtrl',
        controller: jobController
      })
  })

  .controller('jobController', jobController)


function jobController($stateParams, $http, $scope, socket, Modal, gridParms, jobParms) {
  this.$http = $http;
  this.socket = socket;
  this.jobList = [];
  this.job = {};
  this.gridParms = gridParms;
  this.gridParms.parms = jobParms.parms;
  //get all the records

  console.log(this.gridParms.parms);
  this.$http.get('/api/jobs')
    .then(response => {
      this.jobList = response.data;
      this.socket.syncUpdates('job', this.jobList);

    });
  this.deleteJob = Modal.confirm.delete(job => {
    this.$http.delete('/api/jobs/' + job._id);
  });

  this.showJob = Modal.edit.editShow(job => {
    if (job._id) {
      this.$http.put('/api/jobs/' + job._id, job);

    } else {
      if (job.institution) {
        this.$http.post('/api/jobs', {
          institution: job.institution
        });
        this.newJobInstitution = '';
      }
    }
  });
  this.addJob = Modal.edit.editShow(job => {
    if (job._id) {
      this.$http.put('/api/jobs/' + job._id, job);

    } else {
      if (job.institution) {
        this.$http.post('/api/jobs', {
          institution: job.institution,

        });
        this.newJobInstitution = '';

      }
    }
  });
  this.updateJob = function (job) {
    if (job._id) {
      this.$http.put('/api/jobs/' + job._id, job);

    } else {
      if (job.institution) {
        this.$http.post('/api/jobs', {
          institution: job.institution
        });
        this.newJobInstitution = '';
      }
    }

  };

};

