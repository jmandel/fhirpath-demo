/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var app, fpath;

	__webpack_require__(3);

	__webpack_require__(4);

	__webpack_require__(5);

	__webpack_require__(6);

	__webpack_require__(10);

	fpath = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../fhirpath.js/build/bundle.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	app = angular.module('app', ['ngCookies', 'ngRoute', 'ngAnimate', 'ui.codemirror']);

	app.run(function($rootScope, $window) {
	  return console.log('run');
	});

	app.config(function($routeProvider) {
	  var rp;
	  rp = $routeProvider;
	  rp.when('/', {
	    name: 'index',
	    templateUrl: '_index.jade',
	    controller: 'IndexCtrl',
	    reloadOnSearch: false
	  });
	  return rp.otherwise({
	    templateUrl: '404.jade'
	  });
	});

	app.controller('IndexCtrl', function($scope) {
	  var codemirrorExtraKeys;
	  $scope.path = 'Patient.name.given |  Patient.name.given';
	  $scope.resource = '{"resourceType": "Patient", "name": [{"given": ["John"]}]}';
	  $scope.update = function() {
	    var e, error, result;
	    try {
	      console.log($scope.path);
	      result = fpath(JSON.parse($scope.resource), $scope.path);
	      $scope.result = JSON.stringify(result[1], null, "  ");
	      return $scope.errors = [];
	    } catch (error) {
	      e = error;
	      console.log('ERROR', e);
	      if (e.errors) {
	        return $scope.errors = e.errors;
	      } else {
	        return $scope.error = e.toString();
	      }
	    }
	  };
	  $scope.update();
	  console.log('here');
	  codemirrorExtraKeys = window.CodeMirror.normalizeKeyMap({
	    "Ctrl-Space": function() {
	      return $scope.$apply('doMapping()');
	    },
	    Tab: function(cm) {
	      return cm.replaceSelection("  ");
	    }
	  });
	  return $scope.codemirrorConfig = {
	    lineWrapping: false,
	    lineNumbers: true,
	    mode: 'javascript',
	    extraKeys: codemirrorExtraKeys,
	    viewportMargin: Infinity
	  };
	});


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "/index.html"

/***/ },
/* 4 */
/***/ function(module, exports) {

	var v1="<h3>Page not found</h3>";
	window.angular.module(["ng"]).run(["$templateCache",function(c){c.put("404.jade", v1)}]);
	module.exports=v1;

/***/ },
/* 5 */
/***/ function(module, exports) {

	var v1="<div class=\"main-menu row\"><div class=\"col-xs-12\"><h3>fhir path demo</h3></div></div><div class=\"container\"><br><div class=\"row\"><div class=\"col-xs-12\"><input placeholder=\"fhir path\" ng-model=\"path\" ng-change=\"update()\" class=\"form-control\"><br><ul ng-repeat=\"er in errors\"><li>{{er[4]}}</li></ul><div class=\"alert\"><pre>{{error}}</pre></div></div></div><div class=\"row\"><div class=\"col-xs-6\"><textarea ng-model=\"resource\" ui-codemirror=\"codemirrorConfig\" ng-change=\"update()\" class=\"fh form-control\"></textarea></div><div class=\"col-xs-6\"><textarea ng-model=\"result\" ui-codemirror=\"codemirrorConfig\" class=\"fh form-control\"></textarea></div></div></div>";
	window.angular.module(["ng"]).run(["$templateCache",function(c){c.put("_index.jade", v1)}]);
	module.exports=v1;

/***/ },
/* 6 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Binds a CodeMirror widget to a <textarea> element.
	 */
	angular.module('ui.codemirror', [])
	  .constant('uiCodemirrorConfig', {})
	  .directive('uiCodemirror', uiCodemirrorDirective);

	/**
	 * @ngInject
	 */
	function uiCodemirrorDirective($timeout, uiCodemirrorConfig) {

	  return {
	    restrict: 'EA',
	    require: '?ngModel',
	    compile: function compile() {

	      // Require CodeMirror
	      if (angular.isUndefined(window.CodeMirror)) {
	        throw new Error('ui-codemirror needs CodeMirror to work... (o rly?)');
	      }

	      return postLink;
	    }
	  };

	  function postLink(scope, iElement, iAttrs, ngModel) {

	    var codemirrorOptions = angular.extend(
	      { value: iElement.text() },
	      uiCodemirrorConfig.codemirror || {},
	      scope.$eval(iAttrs.uiCodemirror),
	      scope.$eval(iAttrs.uiCodemirrorOpts)
	    );

	    var codemirror = newCodemirrorEditor(iElement, codemirrorOptions);

	    configOptionsWatcher(
	      codemirror,
	      iAttrs.uiCodemirror || iAttrs.uiCodemirrorOpts,
	      scope
	    );

	    configNgModelLink(codemirror, ngModel, scope);

	    configUiRefreshAttribute(codemirror, iAttrs.uiRefresh, scope);

	    // Allow access to the CodeMirror instance through a broadcasted event
	    // eg: $broadcast('CodeMirror', function(cm){...});
	    scope.$on('CodeMirror', function(event, callback) {
	      if (angular.isFunction(callback)) {
	        callback(codemirror);
	      } else {
	        throw new Error('the CodeMirror event requires a callback function');
	      }
	    });

	    // onLoad callback
	    if (angular.isFunction(codemirrorOptions.onLoad)) {
	      codemirrorOptions.onLoad(codemirror);
	    }
	  }

	  function newCodemirrorEditor(iElement, codemirrorOptions) {
	    var codemirrot;

	    if (iElement[0].tagName === 'TEXTAREA') {
	      // Might bug but still ...
	      codemirrot = window.CodeMirror.fromTextArea(iElement[0], codemirrorOptions);
	    } else {
	      iElement.html('');
	      codemirrot = new window.CodeMirror(function(cm_el) {
	        iElement.append(cm_el);
	      }, codemirrorOptions);
	    }

	    return codemirrot;
	  }

	  function configOptionsWatcher(codemirrot, uiCodemirrorAttr, scope) {
	    if (!uiCodemirrorAttr) { return; }

	    var codemirrorDefaultsKeys = Object.keys(window.CodeMirror.defaults);
	    scope.$watch(uiCodemirrorAttr, updateOptions, true);
	    function updateOptions(newValues, oldValue) {
	      if (!angular.isObject(newValues)) { return; }
	      codemirrorDefaultsKeys.forEach(function(key) {
	        if (newValues.hasOwnProperty(key)) {

	          if (oldValue && newValues[key] === oldValue[key]) {
	            return;
	          }

	          codemirrot.setOption(key, newValues[key]);
	        }
	      });
	    }
	  }

	  function configNgModelLink(codemirror, ngModel, scope) {
	    if (!ngModel) { return; }
	    // CodeMirror expects a string, so make sure it gets one.
	    // This does not change the model.
	    ngModel.$formatters.push(function(value) {
	      if (angular.isUndefined(value) || value === null) {
	        return '';
	      } else if (angular.isObject(value) || angular.isArray(value)) {
	        throw new Error('ui-codemirror cannot use an object or an array as a model');
	      }
	      return value;
	    });


	    // Override the ngModelController $render method, which is what gets called when the model is updated.
	    // This takes care of the synchronizing the codeMirror element with the underlying model, in the case that it is changed by something else.
	    ngModel.$render = function() {
	      //Code mirror expects a string so make sure it gets one
	      //Although the formatter have already done this, it can be possible that another formatter returns undefined (for example the required directive)
	      var safeViewValue = ngModel.$viewValue || '';
	      codemirror.setValue(safeViewValue);
	    };


	    // Keep the ngModel in sync with changes from CodeMirror
	    codemirror.on('change', function(instance) {
	      var newValue = instance.getValue();
	      if (newValue !== ngModel.$viewValue) {
	        scope.$evalAsync(function() {
	          ngModel.$setViewValue(newValue);
	        });
	      }
	    });
	  }

	  function configUiRefreshAttribute(codeMirror, uiRefreshAttr, scope) {
	    if (!uiRefreshAttr) { return; }

	    scope.$watch(uiRefreshAttr, function(newVal, oldVal) {
	      // Skip the initial watch firing
	      if (newVal !== oldVal) {
	        $timeout(function() {
	          codeMirror.refresh();
	        });
	      }
	    });
	  }

	}


/***/ }
/******/ ]);