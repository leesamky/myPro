var angular=require('angular')
var _ =require('lodash')



const factory=angular.module('factory',[])
            .factory('todoFactory',($http)=>{
                "use strict";
                let createHasInput=false 
                function getTask($scope){
                    $http.get('/matches/display')
                        .then(function successCallback(response){
                                if(response.data){
                                    _.forEach(response.data,function(match){
                                        match['starts']=new Date(match['starts'])
                                    })
                                    $scope.todos=response.data
                                }

                            },
                            function errorCallback(response){
                                console.log(response)
                            })
                }
                
                function watchInput($scope,val){
                    if(!val&&createHasInput){
                        $scope.todos.pop()
                        createHasInput=false 
                    }else if(val && !createHasInput){
                        $scope.todos.push({task:val,isCompleted:false})
                        createHasInput=true 
                    }else if(val && createHasInput){
                        $scope.todos[$scope.todos.length-1].task=val
                    }
                }

                function postTask($scope){
                    $http.post('/todos',{
                        task:$scope.createTaskInput,
                        isCompleted:false
                    })
                        .then(function successCallback(response){
                                $scope.createTaskInput=''
                                createHasInput=false
                            },
                            function errorCallback(response){
                                console.log(response)
                            })
                }

                function putTask($scope,todo){
                    $http.put('/todos/'+todo._id,{task:todo.newTask})
                        .then(function successCallback(response){

                                todo.isEditing=false
                                todo.task=todo.newTask
                            },
                            function errorCallback(response){
                                console.log(response)
                            })
                }

                function deleteTask($scope,todo,index){
                    $http.delete('/todos/'+todo._id)
                        .then(function successCallback(response){
                                _.pullAt($scope.todos,index)
                                console.log('deleted one task')

                            },
                            function errorCallback(response){
                                console.log(response)
                            })
                }

                return{
                    getTask,
                    watchInput,
                    postTask,
                    putTask,
                    deleteTask
                }

            })

module.exports=factory