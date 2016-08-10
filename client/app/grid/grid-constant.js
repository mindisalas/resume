'use strict';

angular.module('resumeApp')


//var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.edit', 'ui.grid.selection', 'ui.grid.exporter',
//'ngAnimate', 'ui.bootstrap', 'schemaForm']);

  .constant('eduSchema', {
    'type': 'object',
    'properties': {
      institution: {
        type: 'string',
        title: 'Institution'
      },
      fieldOfStudy: {
        type: 'string',
        title: 'Field of Study'
      },
      fsStartDate: {
        type: 'string',
        title: 'Start Date'
      },
      fsFinishDate: {
        type: 'string',
        title: 'Finish Date'
      },
      certTitle: {
        type: 'string',
        title: 'Certification/Details'
      }
    },
    "required": [
      "institution"
    ]
  })
