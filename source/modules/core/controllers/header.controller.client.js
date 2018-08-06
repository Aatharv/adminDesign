(function () {
    'use strict';
  
    angular
      .module('core')
      .controller('HeaderController', HeaderController);
  
    function HeaderController() {
      var vm = this;
      vm.location = 'Header Controller';
    }
  }());