/*
/!**
 * Created by Mindi on 6/3/2016.
 *!/
 * test github
(function() {
  class EducationController {
//end-non-standard
    $onInit($scope) {

      return console.log("got to init of education controller //todo " + this.education );  //todo remove
    }
  }

  angular.module('resumeApp')
    .component('education', {
      templateUrl: 'app/education/education.html',
      controller: EducationController,
      controllerAs: "eduCtrl"
    });
})();
*/
