'use strict';

angular.module('resumeApp')

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
      },
      _id: {
        type: 'string',
        title: 'mongoID'
      }
    },
    "required": [
      "institution"
    ]
  })
