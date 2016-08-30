'use strict';

angular.module('resumeApp')
//todo - add validation pattern, description, placeholder, etc to the jobParms.parms.formSchema
  .value('jobParms', {
    "parms": {
      'endPointType': 'job',
      'endPoint': '/api/job',
      'endPointPluralized': '/api/jobs',
      'formSchema': {
        'type': 'object',
        'properties': {
          companyName: {
            type: 'string',
            title: 'Company'
          },
          companyInfo: {
            type: 'string',
            title: 'Company Info'
          },
          coStartDate: {
            type: 'string',
            title: 'Co start date'
          },
          coFinishDate: {
            type: 'string',
            title: 'Co finish date'
          },
          sortOrder: {
            type: 'number',
            title: 'sort Order*',
            description: '*use number greater than 9 to be included in the main display. Sorted in descending order.'
          }
        },
        "required": [
          "companyName"
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
          field: 'companyName',
          displayName: 'Company Name',
          headerCellClass: 'this.highlightFilteredHeader'
        },
        {
          field: 'companyInfo',
          displayName: 'Company Information',
          headerCellClass: 'this.highlightFilteredHeader'
        },
        {
          field: 'coStartDate',
          displayName: 'Start Date',
          headerCellClass: 'this.highlightFilteredHeader'
        },
        {
          field: 'coFinishDate',
          displayName: 'Finish Date',
          headerCellClass: 'this.highlightFilteredHeader'
        },
        {
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
          'key': 'companyName' //changed
        },
        {
          'type': 'section',
          'items': ['companyInfo']
        },
        {
          'type': 'section',
          'items': ['coStartDate']
        },
        {
          'type': 'section',
          'items': ['coFinishDate']
        },
        {
          'type': 'section',
          'items': ['sortOrder']
        }

      ]
    }
  })

