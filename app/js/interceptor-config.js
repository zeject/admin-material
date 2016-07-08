'use strick';

app.factory('HttpInterceptor', function($rootScope, $q, $timeout, $injector) {
	var httpInterceptor = {
		'responseError' : function(response) {
			$timeout(function() {
				$rootScope.$emit("dataLoad", false);
			}, 200);
			return $q.reject(response);
		},
		'response' : function(response) {
			if (response.config.url.indexOf('.html') == -1) {
				$timeout(function() {
					$rootScope.$emit("dataLoad", false);
				}, 200);
			}
			if (response.data.loginInterceptor) {
				$rootScope.$emit("loginInterceptor", true);
			}
			return response;
		},
		'request' : function(config) {
			// console.log(~config.url.indexOf('/u/'));
			if (!!~config.url.indexOf('http://')) {

			} else if (!~config.url.indexOf('html')) {
				// config.url = 'http://127.0.0.1' + config.url;
			}
			if (config.headers['Content-Type'] == 'application/x-www-form-urlencoded') {
				// timeout = $timeout(function() {
				$rootScope.$emit("dataLoad", true);
				// }, 400);
			}
			return config;
		},
		'requestError' : function(config) {
			$timeout(function() {
				$rootScope.$emit("dataLoad", false);
			}, 200);
			return $q.reject(config);
		}
	}
	return httpInterceptor;
});

/**
 * post 提交参数
 */
app.config(function($httpProvider) {
	// $httpProvider.defaults.headers.common.['Cache-Control'] =
	// 'no-cache';
	$httpProvider.interceptors.push('HttpInterceptor');
	$httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
	// Override $http service's default transformRequest
	$httpProvider.defaults.transformRequest = [function(data) {
		/**
		 * The workhorse; converts an object to x-www-form-urlencoded
		 * serialization.
		 * 
		 * @param {Object}
		 *            obj
		 * @return {String}
		 */
		var param = function(obj) {
			var query = '';
			var name, value, fullSubName, subName, subValue, innerObj, i;

			for (name in obj) {
				value = obj[name];

				if (value instanceof Date) {
					var month = +value.getMonth() + 1;
					var day = value.getDate();
					query += encodeURIComponent(name) + '=' + value.getFullYear() + '-'
							+ (((month + '').length < 2) ? ('0' + month) : month) + '-'
							+ (((day + '').length < 2) ? ('0' + day) : day) + '&';
				} else if (value instanceof Array) {
					for (i = 0; i < value.length; ++i) {
						subValue = value[i];
						fullSubName = name;
						innerObj = {};
						innerObj[fullSubName] = subValue;
						query += param(innerObj) + '&';
					}
				} else if (value instanceof Object) {
					for (subName in value) {
						subValue = value[subName];
						fullSubName = name + '[' + subName + ']';
						innerObj = {};
						innerObj[fullSubName] = subValue;
						query += param(innerObj) + '&';
					}
				} else if (value !== undefined && value !== null) {
					query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
				}
			}
			return query.length ? query.substr(0, query.length - 1) : query;
		};

		return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
	}];
});