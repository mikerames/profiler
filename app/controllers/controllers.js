'use strict';
angular.module('confusionApp')

  .controller('IndexController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

    $scope.promotion = [];
    $scope.showPromotion = false;
    $scope.message = "Loading ...";
    $scope.promotion = menuFactory.getPromotions().get({ id: '58b3694461296a7cfc7ab739' }).$promise.then(
      function (response) {
        $scope.promotion = response;
        $scope.showPromotion = true;
      },
      function (response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
      }
    );

  }])

  .controller('ProfilesCtrl', ['$scope', 'profilesFactory', function ($scope, profilesFactory) {
    console.log('got into ProfilesCtrl');
    $scope.profiles = [];
    $scope.message = "Loading ...";
    profilesFactory.getProfiles().query(
      function (response) {
        $scope.profiles = response;
      },
      function (response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
      }
    );
  }])


  .controller('ProfileCtrl', ['$scope', '$stateParams', 'profilesFactory', function ($scope, $stateParams, profilesFactory) {
    $scope.message = "Loading ...";
    console.log($stateParams.id);

    $scope.profile = profilesFactory.getProfiles().get({ id: $stateParams.id }).$promise.then(
      function (response) {
        $scope.profile = response;
      },
      function (response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
      }
    )
  }])

  .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
    console.log('got into MenuController');
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = true;

    $scope.dishes = []; //atencao

    $scope.showMenu = false;
    $scope.message = "Loading ...";
    menuFactory.getDishes().query(
      function (response) {
        $scope.dishes = response;
        $scope.showMenu = true;
      },
      function (response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
      }
    );

    //Tabs
    $scope.select = function (setTab) {
      $scope.tab = setTab;

      if (setTab === 2) {
        $scope.filtText = "appetizer";
      }
      else if (setTab === 3) {
        $scope.filtText = "mains";
      }
      else if (setTab === 4) {
        $scope.filtText = "dessert";
      }
      else {
        $scope.filtText = "";
      }
    };

    $scope.isSelected = function (checkTab) {
      return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
      $scope.showDetails = !$scope.showDetails;
    };

  }])

  .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {
    console.log('got into DishDetailController');

    //     $scope.dish = menuFactory.getDish(parseInt($stateParams.id,10)); --original

    //$scope.dish = {};
    $scope.showDish = false;
    $scope.message = "Loading ...";

    console.log($stateParams.id);

    //$scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)}).$promise.then(
    $scope.dish = menuFactory.getDishes().get({ id: $stateParams.id }).$promise.then(
      function (response) {
        $scope.dish = response;
        $scope.showDish = true;
      },
      function (response) {
        $scope.message = "Error: " + response.status + " " + response.statusText;
      }
    )

    //filter to fix
    /*
    $scope.filterBy = '';
    
    $scope.filter = document.getElementById('input');
    
    input.addEventListener('keyup',function(){
    $scope.filterBy = input.value;
    console.log(this.filterBy);
    });
    */
  }])

  .controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
    $scope.submitComment = function () {
      $scope.mycomment.date = new Date().toISOString();
      console.log($scope.mycomment);
      $scope.dish.comments.push($scope.mycomment);

      menuFactory.getDishes().update({ id: $scope.dish.id }, $scope.dish);
      $scope.commentForm.$setPristine();
      $scope.mycomment = { rating: 5, comment: "", author: "", date: "" };
    }
  }])

  .controller('ContactController', ['$scope', function ($scope) {
    console.log('got into ContactController');

    $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: false, email: "" };
    var channels = [{ value: "tel", label: "Tel." }, { value: "Email", label: "Email" }];
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;
  }])


  .controller('FeedbackController', ['$scope', function ($scope) {
    $scope.sendFeedback = function () {
      console.log($scope.feedback);
      if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && !$scope.feedback.mychannel) {
        $scope.invalidChannelSelection = true;
        console.log('incorrect');
      }
      else {
        $scope.invalidChannelSelection = false;
        $scope.feedback = {
          mychannel: "", firstName: "", lastName: "",
          agree: false, email: ""
        };
        $scope.feedback.mychannel = "";

        $scope.feedbackForm.$setPristine();
        console.log($scope.feedback);
      }
    };
  }])

