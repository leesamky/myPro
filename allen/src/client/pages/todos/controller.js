var _ =require('lodash')
module.exports=function($scope,todoFactory,$interval){
    "use strict";
    $interval(todoFactory.getTask,1000,0,true,$scope)


    $scope.$watch('createTaskInput',_.partial(todoFactory.watchInput,$scope))

    $scope.createTask=_.partial(todoFactory.postTask,$scope)

    $scope.updateTask=_.partial(todoFactory.putTask,$scope)
    
    $scope.deleteTask=_.partial(todoFactory.deleteTask,$scope)
    
    $scope.onCheckClick=todo=>{
        todo.isCompleted=!todo.isCompleted 

    }
    
    $scope.onEditClick=todo=>{
        todo.isEditing=true
        todo.newTask=todo.task
    }

    $scope.onCancelClick=todo=>{
        todo.isEditing=false
    }

}