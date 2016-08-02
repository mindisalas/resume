'use strict';

angular.module('resumeApp')
  .factory('Modal', function($rootScope, $uibModal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $uibModal.open() returns
     * @param modalTemplate         - default template that can be overriden
     */
    function openModal(scope = {}, modalClass = 'modal-default', modalTemplate = 'components/modal/modal.html') {
      var modalScope = $rootScope.$new();

      angular.extend(modalScope, scope);

      return $uibModal.open({
        //templateUrl: 'components/modal/modal.html',
        templateUrl: modalTemplate,
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */

      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
          delete(del = angular.noop) {
          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function () {
            var args = Array.prototype.slice.call(arguments),
              name = args.shift(),
              deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>Are you sure you want to delete <strong>' + name +
                '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function (e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function (e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function (event) {
              console.log(del);
              console.log(args);
              del.apply(event, args);
            });
          };
        }
      },
      edit: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
          editShow(edit1 = angular.noop) {
          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function () {
            var args = Array.prototype.slice.call(arguments),  //copy args passed from calling event into array
                record = args.shift(), // xxx = args.shift(),  //the first arg is the record to display
                newRecord = Object.assign({},record), //create a copy of the object so that updates can be canceled if needed.
                updRecord,
                lookModal;

            lookModal = openModal({
              modal: {
                dismissable: true,
                title: 'Editing "' + record.institution +'"',
                record: newRecord,
                html: '<p>Update <strong>' + record.institution +
                '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-primary',
                  text: 'Update Record',
                  click: function (e, updates) {
                    //console.dir(e);
                    //console.dir(updates);
                    updRecord = updates;
                    lookModal.close(e);

                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function (e) {
                    lookModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-primary', 'components/modal/modal.edit.html');

            lookModal.result.then(function (event) {
                //console.info("record using dir:");
                //console.dir(updRecord);
                //console.info("record using log:");
                //console.log(record);
                //console.info("updRecord.fieldOfStudy");
                //console.log(updRecord.fieldOfStudy);
                //console.info("editShow");
                //console.log(edit1);
                //console.info("args");
                //console.log(args);
              edit1.call(event, updRecord);
            });
          };
        }
      },
      test: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
          test1(del = angular.noop) {
          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function () {
            var args = Array.prototype.slice.call(arguments),
              name = args.shift(), // xxx = args.shift(),
              lookModal;

            lookModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>Are you sure you want to look at <strong>' + name.institution +
                '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-primary',
                  text: 'look',
                  click: function (e) {
                    lookModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function (e) {
                    lookModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-primary');

            lookModal.result.then(function (event) {
              console.info("name using dir:");
              console.dir(name);
              console.info("name using log:");
              console.log(name);
              console.info("name.fieldOfStudy");
              console.log(name.fieldOfStudy);
              console.info("del");
              console.log(del);
              console.info("args");
              console.log(args);
              //del.apply(event, args);
            });
          };
        }
      }
    }
  });
