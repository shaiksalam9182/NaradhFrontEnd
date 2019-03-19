var helloModule = angular.module('firstApp', ['ngCookies', 'ngRoute','ui.router']);


helloModule.config(function($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "login.html",
            controller: 'hello'
        })
        .when("/home", {
            templateUrl: "home.html",
            controller: 'homeController'
        }).
    otherwise({
        redirectTo: '/login'
    })
});

helloModule.config(function($stateProvider){
    var postState = {
        name:'posts',
        // url:'/posts',
        templateUrl:'posts.html'
    }

    var placesState = {
        name:'places',
        // url:'/places',
        templateUrl:'places.html'
    }

    var alienState = {
        name:'aliens',
        // url:'/aliens',
        templateUrl:'aliens.html'
    }

    var movieState = {
        name:'movies',
        // url:'/movies',
        templateUrl:'movies.html'
    }

    $stateProvider.state(postState);
    $stateProvider.state(placesState);
    $stateProvider.state(alienState);
    $stateProvider.state(movieState);
})


helloModule.controller('hello', function($scope, $http, $cookies, $location) {
    $scope.student = {
        firstname: 'salam',
        lastname: 'shaik'
    }

    $scope.authenticate = function() {
        console.log($scope.phone, $scope.password);
        $scope.calling = true;
        $scope.message = "";
        if ($scope.phone == "") {
            $scope.calling = false;
            $scope.message = "phone is empty"
            console.log('phone is empty');
        } else if ($scope.password == "") {
            $scope.calling = false;
            $scope.message = 'password is empty'
            console.log('password is empty');
        } else if (($scope.phone + "").length < 10) {
            $scope.calling = false;
            $scope.message = "phone number is invalid"
            console.log('phone length is invalid');
        } else {
            var url = "https://naaradh.in/login"
            var data = {
                phone: $scope.phone,
                password: $scope.password,
                device_type: "Web",
                android_id: "123456789",
                login_by: "manual",
                fcm_token: "fGnniI7jCHo:APA91bFAMJaSouAJZaVLbjhZGRD6m4rPfFFCfAFQ93naYY6AqZ3Xy4j52T2Tf9KZlhtn833J9xMjFg8-AHMQly-L3nPftZ34JSljRmkACKgkfwgtfECbTS_2fBwzs2iwVIAX74Oog7Fw"
            }
            $http.post(url, data).then(function(msg) {
                $scope.calling = false;
                console.log(msg);
                if (msg.status == 200) {
                    if (msg.data.status == "success") {
                        $cookies.put('token', msg.data.token);
                        $cookies.put('user', msg.data.phone);
                        $scope.message = msg.data.message;
                        $location.path('/home');
                    } else if (msg.data.status == "Failed") {
                        $scope.message = msg.message;
                    }
                } else if (msg.status == 400) {
                    console.log(msg.data);
                    $scope.message = msg.data;
                } else {
                    $scope.message = "Another error"
                }
            })
        }
    }


})

helloModule.controller('authenticate', function($scope) {
    console.log('submit clicked');
})

helloModule.controller('homeController', function($scope) {

})