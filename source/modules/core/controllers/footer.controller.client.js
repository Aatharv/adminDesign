(function () {
    'use strict';
  
    angular
      .module('core')
      .controller('FooterController', FooterController);
  
    function FooterController() {
      var vm = this;
      vm.location = 'Footer Controller';
    }
  }());