var uiRouter=require('angular-ui-router')
var angular=require('angular')
var controller=require('client/pages/todos/controller')
var todoFactory=require('client/angular/factory')
var app=angular.module('Router',[uiRouter,todoFactory.name])
        .config(($stateProvider,$locationProvider,$urlRouterProvider)=>{
            "use strict";
            $locationProvider.html5Mode(true)

            $urlRouterProvider.otherwise('/')

            $stateProvider
                .state('todos',{
                    url:'/',
                    template:require('client/pages/todos/todos.html'),
                    controller:controller

                })
                .state('about',{
                    url:'/about',
                    template:require('client/pages/about/about.html')
                })
        })

module.exports=app