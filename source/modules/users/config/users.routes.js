(function () {
    'use strict';
  
    // Setting up route
    angular
      .module('users.routes')
      .config(routeConfig);
  
    routeConfig.$inject = ['$stateProvider'];
  
    function routeConfig($stateProvider) {
      // Users state routing
      $stateProvider
        .state('authentication', {
          abstract: true,
          url: '/authentication',
          templateUrl: './modules/users/views/authentication.client.view.html',
          controller: 'AuthenticationController',
         
        })
       
        .state('authentication.signin', {
          url: '/signin?err',
          templateUrl: './modules/users/views/signin.client.view.html',
          controller: 'AuthenticationController',
          
        })
        
        
        
    }
  
     
  }());