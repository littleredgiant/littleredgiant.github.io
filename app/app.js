var app = angular
	.module('portfolio', [
			'ui.router'
		])
	.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', '$httpProvider', '$injector',
		function($urlRouterProvider, $stateProvider, $locationProvider, $httpProvider, $injector) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('grid', {
				url: '/',
				templateUrl: './app/templates/gridView.html'
			})
			.state('project', {
				url: '/project/:name',
				templateUrl: './app/templates/projectView.html',
				controller: 'projectCtrl'
			})
	}])

	.controller( 'projectCtrl', ['$scope', '$timeout', '$state', '$stateParams', '$http', function( $scope, $timeout, $state, $stateParams, $http ) {

		$http.get('./projects/'+$stateParams.name+'.json').then(function(response) {
			$scope.project = response.data;
		});

		$timeout(function(){
			angular.element(document.getElementsByTagName("body")).addClass("project-open");
		},550);

		$scope.back = function() {
			angular.element(document.getElementsByClassName("content")).addClass("out");

			$timeout(function(){
				angular.element(document.getElementsByClassName("content")).removeClass("out");
				angular.element(document.getElementsByTagName("body")).removeClass("project-open");
				$state.go('grid');
			},300);
		}
	}])
	.filter("sanitize", ['$sce', function($sce) {
	  return function(htmlCode){
	    return $sce.trustAsHtml(htmlCode);
	  }
	}])