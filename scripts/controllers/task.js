'use strict';

app.controller('TaskController', function($scope, FURL, $firebase, $location, $routeParams) {

  var ref = new Firebase(FURL);
  var fbTasks = $firebase(ref.child('tasks')).$asArray();
  var taskId = $routeParams.taskId;

  if(taskId) {
    $scope.selectedTask = getTask(taskId);
    console.log($scope.selectedTask);
  }

  function getTask(taskId) {
    return $firebase(ref.child('tasks').child(taskId)).$asObject();
  };

  $scope.updateTask = function(task) {
    console.log(task);
    console.log($scope.selectedTask);
    $scope.selectedTask.$save(task);
		$location.path('/browse');
	};

  $scope.tasks = fbTasks;

  $scope.postTask = function(task){
    fbTasks.$add(task);
    $location.path('/browse');
  };
});
