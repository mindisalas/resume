'use strict';

angular.module('resumeApp')
//todo - add validation pattern, description, placeholder, etc to the educationParms.parms.formSchema
  .value('educationParms', {
    "parms": {
      'endPointType': 'education',
      'endPoint': '/api/education',
      'endPointPluralized': '/api/educations',
      'formSchema': {
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
          sortOrder: {
            type: 'number',
            title: 'sort Order*',
            description: '*use number greater than 9 to be included in the main display. Sorted in descending order.'
          }
        },
        "required": [
          "institution"
        ]
      },
      'columnDefs': [{
        name: 'modify',
        maxWidth: 35,
        displayName: '',
        enableFiltering: false,
        enableSorting: false,
        enableColumnMenu: false,
        cellTemplate: 'components/grid/edit-button.html'
      },
        //xDRY - columnDefs array - 'fields' need to be passed in some how (perhaps with all variables in the array)
        {
          field: 'institution',
          headerCellClass: 'this.highlightFilteredHeader'
        }, {
          field: 'fieldOfStudy',
          headerCellClass: 'this.highlightFilteredHeader'
        }, {
          field: 'fsStartDate',
          displayName: 'Start Date',
          headerCellClass: 'this.highlightFilteredHeader'
        }, {
          field: 'fsFinishDate',
          displayName: 'Finish Date',
          headerCellClass: 'this.highlightFilteredHeader'
        }, {
          field: 'certTitle',
          displayName: 'Cert/Details',
          headerCellClass: 'this.highlightFilteredHeader'
        }, {
          field: 'sortOrder',
          displayName: 'sortOrder Descending'
        }, {
          name: 'delete',
          maxWidth: 35,
          displayName: '',
          enableFiltering: false,
          enableSorting: false,
          enableColumnMenu: false,
          cellTemplate: 'components/grid/delete-button.html'
        },],
      //
      'form': [
        {
          'key': 'institution' //changed
        },
        {
          'key': 'fieldOfStudy'  //changed
        },
        {
          'type': 'section',
          'htmlClass': 'row',
          'items': [
            {
              'type': 'section',
              'htmlClass': 'col-sm-6',
              'items': [
                'fsStartDate'  //changed
              ]
            },
            {
              'type': 'section',
              'htmlClass': 'col-sm-6',
              'items': [
                'fsFinishDate' //changed
              ]
            }
          ]
        }, {
          'type': 'section',
          'htmlClass': 'row',
          'items': [
            {
              'type': 'section',
              'htmlClass': 'col-sm-6',
              'items': [
                'certTitle'  //changed
              ]
            }
          ]
        }, {
          'type': 'section',
          'items': ['sortOrder']
        }

      ]
    }
  })

