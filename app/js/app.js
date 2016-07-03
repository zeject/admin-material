'use strict';
/**
 * You must include the dependency on 'ngMaterial'
 */
var app = angular.module('app', [ 'ngMaterial', 'ngAnimate', 'ngAria', 'ngMessages', 'md.data.table', 'ui.router', 'smDateTimeRangePicker']);

app.config(function ($mdThemingProvider,pickerProvider) { 

     pickerProvider.setOkLabel('确定'); 
     pickerProvider.setCancelLabel('取消');
     pickerProvider.setDayHeader('single'); //Options 'single','shortName', 'fullName' 
     pickerProvider.setDaysNames([ 
      {'single':'日','shortName':'日','fullName':'Sunday'}, 
      {'single':'一','shortName':'一','fullName':'MonDay'}, 
      {'single':'二','shortName':'二','fullName':'TuesDay'}, 
      {'single':'三','shortName':'三','fullName':'Wednesday'}, 
      {'single':'四','shortName':'四','fullName':'Thursday'}, 
      {'single':'五','shortName':'五','fullName':'Friday'}, 
      {'single':'六','shortName':'六','fullName':'Saturday'} 
     ]);
     pickerProvider.setDivider('--'); 
     pickerProvider.setMonthNames(["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]); 
     pickerProvider.setRangeCustomStartEnd(['起始日期', '结束日期']); 
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
	
	var vm = $scope.vm = {};

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