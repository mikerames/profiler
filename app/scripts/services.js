'use strict';
angular.module('confusionApp')


.constant("baseURL","http://localhost:8081/")
//.constant("baseURL","https://shielded-ravine-55061.herokuapp.com/")


.service('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {
  this.getDishes = function(){
      return $resource(baseURL+"api/dishes/:id",null,{'update':{method:'PUT' }});
  };

  this.getPromotions = function(){
      return $resource(baseURL+"api/promotions/:id",null,{'update':{method:'PUT' }});
  };

  this.getDish = function (index) {
      return $http.get(baseURL+"dishes/"+index);

  };

}]);

/*	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			}
		}
	}]);
    */