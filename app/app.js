'use strict';

angular.module('confusionApp', ['ui.router','ngResource'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
                    // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
            })

            .state('app.tst', {
                url:'tst',
                views: {
                    'content@': {
                        templateUrl : 'views/tst.html',
                        controller  : ''
                    }
                }
            })

            .state('app.index_login', {
                url:'/index_login',
                views: {
                    'content@': {
                        templateUrl : 'views/index_login.html',
                        controller  : ''
                    }
                }
            })

            .state('app.login', {
                url:'login',
                views: {
                    'content@': {
                        templateUrl : 'views/login.html',
                        controller  : ''
                    }
                }
            })

            .state('app.signup', {
                url:'signup',
                views: {
                    'content@': {
                        templateUrl : 'views/signup.html',
                        controller  : ''
                    }
                }
            })

            .state('app.profile', {
                url:'profile',
                views: {
                    'content@': {
                        templateUrl : 'views/profiles.html',
                        controller  : 'ProfilesCtrl'
                    }
                }
            })

            .state('app.profiles', {
                url:'profiles',
                views: {
                    'content@': {
                        templateUrl : 'views/profiles.html',
                        controller  : 'ProfilesCtrl'
                    }
                }
            })

            // route for the dishdetail page
            .state('app.profiledetails', {
                url: 'profiles/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/profiledetails.html',
                        controller  : 'ProfileCtrl'
                   }
                }
            })

            // route for the aboutus page
            .state('app.aboutus', {
                url:'aboutus',
                views: {
                    'content@': {
                        template: '<h1>To be Completed</h1>'
                   }
                }
            })
                    // route for the contactus page
            .state('app.contactus', {
                url:'contactus',
                views: {
                    'content@': {
                        templateUrl : 'views/contactus.html',
                        controller  : 'ContactController'
                     }
                }
            })

            // route for the menu page
            .state('app.menu', {
                url: 'menu',
                views: {
                    'content@': {
                        templateUrl : 'views/menu.html',
                        controller  : 'MenuController'
                    }
                }
            })

            // route for the dishdetail page
            .state('app.dishdetails', {
                url: 'menu/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/dishdetail.html',
                        controller  : 'DishDetailController'
                   }
                }
            });
            $urlRouterProvider.otherwise('/');
    });