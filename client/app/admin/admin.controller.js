'use strict';

(function() {

  class AdminController {
    constructor(User, Modal) {
      // Use the User $resource to fetch all users
      this.users = User.query();
      console.log("User= " + User);


    //delete(user) {
    //  user.$remove();
    //  this.users.splice(this.users.indexOf(user), 1);
    //}
    // Our callback function is called if/when the delete modal is confirmed
      this.delete = Modal.confirm.delete(user => {
        user.$remove();
        this.users.splice(this.users.indexOf(user), 1);
      });
      //console.dir(this.delete);
    }
  }

  angular.module('resumeApp.admin')
    .controller('AdminController', AdminController);
})();
