'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('timeline',['$http', function($http) {
    return {
        templateUrl:'scripts/directives/timeline/timeline.html',
        restrict: 'E',
        replace: true,
        link: function(scope, el, attr){
            $http.get('https://test.bigchaindb.com/api/v1/assets/?search=mmtest2').then(function(data){
                scope.claims = data.data.sort(function(a,b){
                    return (a.data.datetime > b.data.datetime) ? -1 : 1;
                });
            })
        }
    }
  }]);
