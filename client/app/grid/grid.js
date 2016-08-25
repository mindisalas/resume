'use strict';

angular.module('resumeApp')


//var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.edit', 'ui.grid.selection', 'ui.grid.exporter',
//'ngAnimate', 'ui.bootstrap', 'schemaForm']);


  .controller('GridCtrl', GridCtrl)


//GridCtrl.$inject = ['$http', '$scope', 'socket', 'uiGridConstants', 'RowEditor'];


function GridCtrl($http, $scope, socket, uiGridConstants, RowEditor, Modal, gridParms) {
  this.$http = $http;
  this.socket = socket;
  this.editRow = RowEditor.editRow;
  this.Modal = Modal;
  this.parms = gridParms.parms;

  this.endPoint = this.parms.endPoint; //xDRY - pass the url for the collection as the group variable
  this.endPointPluralized = this.parms.endPointPluralized; //xDRY - pass the url for the collection as the group variable
  this.type = this.parms.endPointType; //xDRY - pass the collection name for the export filename - 'type' + Book.csv
  this.columnDefs = this.parms.columnDefs;
//

  //get list of education entries for the grid
  // this.$http.get('/api/'collection-s' ')
  this.$http.get(this.endPointPluralized)
    .then(response => {
      this.gridOptions.data = response.data;
    });

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
    exporterPdfMaxWidth: 500,
    enableFiltering: true,
    /*    data: this.$http.get*/
    showGridFooter: true,
    columnDefs: this.columnDefs,
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
    this.$http.delete(this.endPointPluralized + '/' + row.entity._id);
    var index = this.gridOptions.data.indexOf(row.entity);
    this.gridOptions.data.splice(index, 1);
  });
//
  this.deleteSelected = function () {
    angular.forEach(this.gridApi.selection.getSelectedRows(), function (data, index) {
      this.gridOptions.data.splice(this.gridOptions.data.lastIndexOf(data), 1);
    });
  }

  this.addRow = function (updateFn) {
    console.log("gridjs.addRow.updateFn")
    console.log(updateFn);
    var newRecord = {
      "id": "0"
    };
    var rowTmp = {};
    rowTmp.entity = newRecord;
    this.editRow(this.gridOptions, rowTmp, updateFn);
  }

}
