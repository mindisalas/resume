'use strict';

angular.module('resumeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('skill', {
        url: '/skill/:skillId',
        templateUrl: 'app/skill/skill.html',
        controllerAs: 'skillCtrl',
        controller: skillController
      })
  })

  .controller('skillController', skillController)


function skillController($stateParams, $http, $scope, socket, Modal, gridParms, skillParms) {
  this.$http = $http;
  this.socket = socket;
  this.skillList = [];
  this.skill = {};
  this.gridParms = gridParms;
  this.gridParms.parms = skillParms.parms;
  //get all the records


  this.$http.get('/api/skills')
    .then(response => {
      this.skillList = response.data;
      this.socket.syncUpdates('skill', this.skillList);

    });
  this.deleteSkill = Modal.confirm.delete(skill => {
    this.$http.delete('/api/skills/' + skill._id);
  });

  this.showSkill = Modal.edit.editShow(skill => {
    if (skill._id) {
      this.$http.put('/api/skills/' + skill._id, skill);

    } else {
      if (skill.institution) {
        this.$http.post('/api/skills', {
          institution: skill.institution
        });
        this.newSkillInstitution = '';
      }
    }
  });
  this.addSkill = Modal.edit.editShow(skill => {
    if (skill._id) {
      this.$http.put('/api/skills/' + skill._id, skill);

    } else {
      if (skill.institution) {
        this.$http.post('/api/skills', {
          institution: skill.institution,

        });
        this.newSkillInstitution = '';

      }
    }
  });
  this.updateSkill = function (skill) {
    if (skill._id) {
      this.$http.put('/api/skills/' + skill._id, skill);

    } else {
      if (skill.institution) {
        this.$http.post('/api/skills', {
          institution: skill.institution
        });
        this.newSkillInstitution = '';
      }
    }

  };

};

