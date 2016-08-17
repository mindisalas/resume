'use strict';

angular.module('resumeApp')


//var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.edit', 'ui.grid.selection', 'ui.grid.exporter',
//'ngAnimate', 'ui.bootstrap', 'schemaForm']);


  .controller('GridCtrl', GridCtrl)


//GridCtrl.$inject = ['$http', '$scope', 'socket', 'uiGridConstants', 'RowEditor'];


function GridCtrl($http, $scope, socket, uiGridConstants, RowEditor, Modal) {
  this.$http = $http;
  this.socket = socket;
  this.editRow = RowEditor.editRow;
  this.Modal = Modal;
  this.group = '/api/education';
  this.type = 'education'

  //get list of education entries for the grid
  // this.$http.get('/api/educations')
  this.$http.get(this.group + 's')
    .then(response => {
      this.gridOptions.data = response.data;
    });

  /*  this.educationList = [{
   "institution": "Advanced Auto Parts",
   "fieldOfStudy": "3633 S 9th St",
   "fsStartDate": "Salina",
   "fsFinishDate": "KS",
   "certTitle": "67401"
   }, {
   "institution": "Arrow Speed Shop",
   "fieldOfStudy": "686 S Adams",
   "fsStartDate": "Kansas City",
   "fsFinishDate": "KS",
   "certTitle": "66105"
   }, {
   "institution": "Carl Quiroga",
   "fieldOfStudy": "10990 Roe Ave",
   "fsStartDate": "Overland Park",
   "fsFinishDate": "KS",
   "certTitle": "66211"
   }, {
   "institution": "E Q Muffler",
   "fieldOfStudy": "1002 Kansas St",
   "fsStartDate": "Great Bend",
   "fsFinishDate": "KS",
   "certTitle": "67530"
   }, {
   "institution": "Extended Outage Verification Test",
   "fieldOfStudy": "10990 Roe Ave",
   "fsStartDate": "Overland Park",
   "fsFinishDate": "KS",
   "certTitle": "66211"
   }, {
   "institution": "Fred Fisher",
   "fieldOfStudy": "80 S Yucca Path",
   "fsStartDate": "Garden City",
   "fsFinishDate": "KS",
   "certTitle": "66538"
   }, {
   "institution": "Heinen True Value",
   "fieldOfStudy": "307 Main",
   "fsStartDate": "Seneca",
   "fsFinishDate": "KS",
   "certTitle": "66538"
   }, {
   "institution": "Keystone Automotive Midwest",
   "fieldOfStudy": "90 Shawnee Ave",
   "fsStartDate": "Kansas City",
   "fsFinishDate": "KS",
   "certTitle": "66105"
   }, {
   "institution": "Keystone Automotive Rail",
   "fieldOfStudy": "Marketing",
   "fsStartDate": "Kansas City",
   "fsFinishDate": "KS",
   "certTitle": "66105"
   }, {
   "institution": "Lane's Company",
   "fieldOfStudy": "10990 Roe Ave",
   "fsStartDate": "Overland Park",
   "fsFinishDate": "KS",
   "certTitle": "66211"
   } ];*/

  this.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
    if (col.filters[0].term) {
      return 'header-filtered';
    } else {
      return '';
    }
  };

  this.selectAll = function () {
    this.gridApi.selection.selectAllRows();
  };

  this.clearAll = function () {
    this.gridApi.selection.clearSelectedRows();
  };

  //todo import PDF maker
  this.gridOptions = {
    enableRowSelection: true,
    enableSelectAll: true,
    multiSelect: true,
    selectionRowHeaderWidth: 35,
    rowHeight: 35,
    enableGridMenu: true,
    exporterCsvFilename: this.type + 'Book.csv',
    exporterPdfTableStyle: {
      margin: [30, 30, 30, 30]
    },
    exporterPdfTableHeaderStyle: {
      fontSize: 10,
      bold: true,
      italics: true,
      color: 'red'
    },
    exporterPdfHeader: {
      text: "Resume " + this.type + " Book",
      style: 'headerStyle'
    },
    exporterPdfFooter: function (currentPage, pageCount) {
      return {
        text: currentPage.toString() + ' of ' + pageCount.toString(),
        style: 'footerStyle'
      };
    },
    exporterPdfCustomFormatter: function (docDefinition) {
      docDefinition.styles.headerStyle = {
        fontSize: 22,
        bold: true
      };
      docDefinition.styles.footerStyle = {
        fontSize: 10,
        bold: true
      };
      return docDefinition;
    },
    exporterPdfOrientation: 'portrait',
    exporterPdfPageSize: 'LETTER',
    exporterPdfMaxGridWidth: 500,
    enableFiltering: true,
    /*    data: this.educationList,*/
    /*   data: educationController.educationList,*/
    showGridFooter: true,
    columnDefs: [{
      name: 'modify',
      maxWidth: 35,
      displayName: '',
      enableFiltering: false,
      enableSorting: false,
      enableColumnMenu: false,
      cellTemplate: 'app/grid/edit-button.html'
    }, {
      field: 'institution',
      headerCellClass: this.highlightFilteredHeader
    }, {
      field: 'fieldOfStudy',
      headerCellClass: this.highlightFilteredHeader
    }, {
      field: 'fsStartDate',
      headerCellClass: this.highlightFilteredHeader
    }, {
      field: 'fsFinishDate',
      displayName: 'Finish Date',
      headerCellClass: this.highlightFilteredHeader
    }, {
      field: 'certTitle',
      displayName: 'Cert/Details',
      headerCellClass: this.highlightFilteredHeader
    }, {
      //todo hide the mondoID
      field: '_id',
      displayName: 'mongoID',
      headerCellClass: this.highlightFilteredHeader
    }, {
      name: 'delete',
      maxWidth: 35,
      displayName: '',
      enableFiltering: false,
      enableSorting: false,
      enableColumnMenu: false,
      cellTemplate: 'app/grid/delete-button.html'
    },]
  };

  this.gridOptions.onRegisterApi = function (gridApi) {
    //set gridApi on scope
    this.gridApi = gridApi;
    this.gridApi.selection.on.rowSelectionChanged($scope, function (row) {
      var msg = 'row selected ' + row.isSelected;
      console.log(msg);
    });


    this.gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
      var msg = 'rows changed ' + rows.length;
      console.log(msg);
    });
  };

  this.deleteRow = this.Modal.confirm.delete(row => {
    console.log(row);
    this.$http.delete(this.group + 's/' + row.entity._id);
    var index = this.gridOptions.data.indexOf(row.entity);
    this.gridOptions.data.splice(index, 1);
  });
//
this.deleteSelected = function () {
  angular.forEach(this.gridApi.selection.getSelectedRows(), function (data, index) {
    this.gridOptions.data.splice(this.gridOptions.data.lastIndexOf(data), 1);
  });
}

this.addRow = function () {
  var newRecord = {
    "id": "0"
  };
  var rowTmp = {};
  rowTmp.entity = newRecord;
  this.editRow(this.gridOptions, rowTmp);
}

}



