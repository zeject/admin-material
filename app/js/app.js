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
		controller : 'ctrl.login',
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
		controller : 'ctrl.admin.buylist',
		templateUrl : 'app/html/center.html'
	});
});

