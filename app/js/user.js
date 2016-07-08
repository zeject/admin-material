'use strict';

app.factory('User', function($q, $http) {
	var user = {
		user : null
	};

	user.setUser = function(u) {
		user.user = u;
	};

	user.Login = function(obj) {
		var method = obj ? 'post' : 'get';
		var deferred = $q.defer();
		$http({
			method : method,
			url : 'http://127.0.0.1/oologin',
			data : obj
		}).success(function(response) {
			deferred.resolve(response);
		}).error(function(error) {
			deferred.reject(error);
		});
		return deferred.promise;
	};
	return user;
});