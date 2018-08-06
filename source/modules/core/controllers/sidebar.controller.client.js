(function () {
    'use strict';
  
    angular
      .module('core')
      .controller('SidebarController', SidebarController);
  
    function SidebarController() {
      var vm = this;
      vm.location = 'Sidebar Controller';
    }
  }());