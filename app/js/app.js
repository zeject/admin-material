'use strict';
/**
 * You must include the dependency on 'ngMaterial'
 */
var app = angular.module('app', [ 'ngMaterial', 'ngAnimate', 'ngAria', 'ngMessages', 'md.data.table', 'mdPickers', 'ui.router' ]);

app.config(function() {

});

app.config(function($stateProvider, $urlRouterProvider) {
	// $urlRouterProvider.when('', '/index/admin/center');
	// $urlRouterProvider.otherwise('/index/admin/center');
	$urlRouterProvider.when('', '/login');
	$urlRouterProvider.otherwise('/login');

	$stateProvider.state('login', {
		url : '/login',
		templateUrl : 'app/html/login.html'
	})

	$stateProvider.state('index', {
		url : '/index',
		abstract : true,
		templateUrl : 'app/html/index.html'
	}).state('index.admin', {
		url : '/admin',
		abstract : true,
		template : '<ui-view></ui-view>'
	}).state('index.admin.center', {
		url : '/center',
		controller : 'ctrl.center',
		templateUrl : 'app/html/center.html'
	});
});

app.controller('ctrl.center', function($scope, $timeout, $mdDialog, $mdEditDialog) {
	
	$scope.myDate = new Date();

	var imagePath = 'app/img/demo.jpg';
	$scope.todos = [ {
		face : imagePath,
		what : 'Arunch this weekend?',
		who : 'Min Li Chan',
		when : '3:08PM',
		notes : " I'll be in your neighborhood doing errands"
	}, {
		face : imagePath,
		what : 'Brunch this weekend?',
		who : 'Min Li Chan',
		when : '3:08PM',
		notes : " I'll be in your neighborhood doing errands"
	}, {
		face : imagePath,
		what : 'Crunch this weekend?',
		who : 'Min Li Chan',
		when : '3:08PM',
		notes : " I'll be in your neighborhood doing errands"
	}, {
		face : imagePath,
		what : 'Erunch this weekend?',
		who : 'Min Li Chan',
		when : '3:08PM',
		notes : " I'll be in your neighborhood doing errands"
	}, {
		face : imagePath,
		what : 'Drunch this weekend?',
		who : 'Min Li Chan',
		when : '3:08PM',
		notes : " I'll be in your neighborhood doing errands"
	}, ];

	$scope.cancel = $mdDialog.cancel;

	$scope.selected = [];

	$scope.query = {
		order : 'name',
		limit : 10,
		page : 1
	};

	$scope.promise = $timeout(function() {
		$scope.desserts = $scope.todos;
	}, 200);

	$scope.getDesserts = function() {
		console.log($scope.query);
		$scope.promise = $timeout(function() {
			$scope.desserts = $scope.todos;
		}, 200);
	};
	$scope.editComment = function(event, dessert) {
		// if auto selection is enabled you will want to stop the event
		// from propagating and selecting the row
		event.stopPropagation();

		/*
		 * messages is commented out because there is a bug currently with
		 * ngRepeat and ngMessages were the messages are always displayed even
		 * if the error property on the ngModelController is not set, I've
		 * included it anyway so you get the idea
		 */

		var promise = $mdEditDialog.small({
			messages : {
				test : 'I don\'t like tests!'
			},
			modelValue : dessert.comment,
			placeholder : 'Add a comment',
			save : function(input) {
				dessert.comment = input.$modelValue;
				console.log('save');
			},
			targetEvent : event,
			validators : {
				'md-maxlength' : 3
			}
		});

		promise.then(function(ctrl) {
			var input = ctrl.getInput();

			input.$viewChangeListeners.push(function() {
				input.$setValidity('test', input.$modelValue !== 'test');
			});
		});
	};
});