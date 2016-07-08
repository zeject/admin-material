'use strict';

app.controller('ctrl.login', function($scope, $rootScope, $state, User) {
	var vm = $scope.vm = {};

	vm.error = false;

	vm.obj = {
		username : '',
		pwd : ''
	};

	vm.login = function() {
		User.Login(vm.obj).then(function(response) {
			console.log(response);
			if (response.user) {
				vm.error = false;
				User.setUser(response.user);
				$rootScope.User = response.user;
				// 跳转
				$state.go('index.admin.center');
			} else {
				// 提示错误
				vm.error = true;
			}
		});
	};
});

// 首页销售列表

app.controller('ctrl.admin', function($scope, $http) {

	var vm = $scope.vm = {};

	vm.items = [];

	vm.obj = {
		pageNumber : 1,
		title : '',
		times : '',
		isoff : false,
		isout : false
	};

	vm.go = function(number) {
		if (number) {
			vm.obj.pageNumber = 1;
		}
		var url = '/admin/getmysell/';
		$http.post(url, vm.obj).success(function(response) {
			vm.items = response.p.data;
			$scope.bigTotalItems = response.p.totalCount;
			$scope.pageSize = response.p.size;
		});
	}
	vm.go();

	vm.out = function(out, item) {
		if (!confirm('确定要' + (out ? '发货' : '取消发货') + '吗?')) {
			return;
		}
		var url = '/admin/product/out';
		$http.post(url, {
			id : item.id,
			isout : out
		}).success(function(response) {
			if (response.flag) {
				item.isout = out;
			} else {
				alert('位置错误,请重试或联系管理员');
			}
		});
	}
});

app.controller('ctrl.admin.buylist', function($scope, $http, $timeout, $mdDialog, $mdEditDialog) {

	var vm = $scope.vm = {};

	vm.obj = {
		order : 'name',
		limit : 10,
		pageNumber : 1
	};
	
	$scope.$watch('vm.obj.date', function(n, o) {
		if (!vm.obj.date) {
			return;
		}
		vm.go(true);
	});

	vm.go = function(number) {
		if (number) {
			vm.obj.pageNumber = 1;
		}
		var url = '/admin/getmysell/';
		$scope.promise = $http.post(url, vm.obj).success(function(response) {
			vm.items = response.p.data;
			console.log(response);
			$scope.bigTotalItems = response.p.totalCount;
			$scope.pageSize = response.p.size;
		});
	}
	vm.go();

	$scope.cancel = $mdDialog.cancel;

	$scope.selected = [];

	$scope.getDesserts = function() {
		vm.go();
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