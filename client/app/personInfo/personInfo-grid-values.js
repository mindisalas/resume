'use strict';

angular.module('resumeApp')
//todo - add validation pattern, description, placeholder, etc to the personInfoParms.parms.formSchema
  .value('personInfoParms', {
    "parms": {
      'endPointType': 'personInfo',
      'endPoint': '/api/personInfo',
      'endPointPluralized': '/api/PersonInfos',
      'formSchema': {
        'type': 'object',
        'properties': {
          institution: {
            type: 'string',
            title: 'PersonInfo Name'
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
          displayName: 'PersonInfo Name',
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
          'type': 'section',
          'items': ['sortOrder']
        }

      ]
    }
  })

