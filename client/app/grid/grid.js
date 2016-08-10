'use strict';

angular.module('resumeApp')


//var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.edit', 'ui.grid.selection', 'ui.grid.exporter',
//'ngAnimate', 'ui.bootstrap', 'schemaForm']);




.controller('GridCtrl', GridCtrl)


GridCtrl.$inject = ['$scope', 'uiGridConstants', '$http', 'RowEditor'];

function GridCtrl($scope, uiGridConstants, $http, RowEditor, eduCtrl) {
  var vm = this;

  vm.editRow = RowEditor.editRow;

  vm.myData = [{
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
  } ];

  vm.highlightFilteredHeader = function(row, rowRenderIndex, col, colRenderIndex) {
    if (col.filters[0].term) {
      return 'header-filtered';
    } else {
      return '';
    }
  };

  vm.selectAll = function() {
    vm.gridApi.selection.selectAllRows();
  };

  vm.clearAll = function() {
    vm.gridApi.selection.clearSelectedRows();
  };


  vm.gridOptions = {
    enableRowSelection: true,
    enableSelectAll: true,
    multiSelect: true,
    selectionRowHeaderWidth: 35,
    rowHeight: 35,
    enableGridMenu: true,
    exporterCsvFilename: 'eduBook.csv',
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
      text: "Resume Edu Book",
      style: 'headerStyle'
    },
    exporterPdfFooter: function(currentPage, pageCount) {
      return {
        text: currentPage.toString() + ' of ' + pageCount.toString(),
        style: 'footerStyle'
      };
    },
    exporterPdfCustomFormatter: function(docDefinition) {
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
    data: vm.myData,
    /*data: eduCtrl.educationList,*/
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
      headerCellClass: vm.highlightFilteredHeader
    }, {
      field: 'fieldOfStudy',
      headerCellClass: vm.highlightFilteredHeader
    }, {
      field: 'fsStartDate',
      headerCellClass: vm.highlightFilteredHeader
    }, {
      field: 'fsFinishDate',
      displayName: 'Finish Date',
      headerCellClass: vm.highlightFilteredHeader
    }, {
      field: 'certTitle',
      displayName: 'Cert/Details',
      headerCellClass: vm.highlightFilteredHeader
    }, {
      name: 'delete',
      maxWidth: 35,
      displayName: '',
      enableFiltering: false,
      enableSorting: false,
      enableColumnMenu: false,
      cellTemplate: 'app/grid/delete-button.html'
    }, ]
  };

  vm.deleteRow = function(row) {
    var index = vm.gridOptions.data.indexOf(row.entity);
    vm.gridOptions.data.splice(index, 1);
  };

  vm.deleteSelected = function() {
    angular.forEach(vm.gridApi.selection.getSelectedRows(), function(data, index) {
      vm.gridOptions.data.splice(vm.gridOptions.data.lastIndexOf(data), 1);
    });
  }

  vm.addRow = function(){
    var newEdu = {
        "id" : "0"
    };
    var rowTmp = {};
    rowTmp.entity = newEdu;
    vm.editRow($scope.vm.gridOptions, rowTmp);
  }

/*  vm.gridOptions.onRegisterApi = function(gridApi) {
    //set gridApi on scope
    vm.gridApi = gridApi;
    gridApi.selection.on.rowSelectionChanged($scope, function(row) {
      var msg = 'row selected ' + row.isSelected;
      $log.log(msg);
    });


    gridApi.selection.on.rowSelectionChangedBatch($scope, function(rows) {
      var msg = 'rows changed ' + rows.length;
      $log.log(msg);
    });
  };*/
}



