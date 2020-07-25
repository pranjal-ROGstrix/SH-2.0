(function () {

  angular.module('LoginApp', []);

  angular.module('LoginApp')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', '$http'];

  function LoginController($scope, $http) {


    sessionStorage.clear();

    $scope.name = "";
    $scope.email = "";
    $scope.contact = "";
    $scope.shopName = "";
    $scope.category = "";
    $scope.password = "";

    $scope.loginEmail = "";
    $scope.loginPassword = "";

    var backend = window.url;

    $scope.signup = function () {

      // var dob = document.getElementById("docDob").value;
      // console.log(dob);

      var obj = {
        "name": $scope.name,
        "email": $scope.email,
        "mobile_no": $scope.mobile_no,
        "shopname": $scope.shopName,
        "category": $scope.category,
        "password": $scope.password
      };

      console.log(obj);
      var jsnObj = JSON.stringify(obj);
      console.log(jsnObj);

      $http({
          method: "POST",
          url: backend + "registration/shop/",
          data: jsnObj
        })
        .then(
          function Success(response) {
            $scope.myWelcome = response.data;
            console.log($scope.myWelcome);
            // var ptnUsername = {"username": $scope.PtnUsrnm}
            // sessionStorage.setItem("DoctorUsername", JSON.stringify(ptnUsername));
            window.location.assign("dashboard.html");

          },
          function Error(response) {
            $scope.myWelcome = response.statusText;
            window.alert("unable to process request");
            // console.log($scope.myWelcome);
            // console.log(jsnObj);
          });

    }

    $scope.login = function () {
      var obj = {
        "email": $scope.loginEmail,
        "password": $scope.loginPassword
      };
      console.log(obj);
      var jsnObj = JSON.stringify(obj);
      console.log(jsnObj);
      // var storageObj = { "username": $scope.username };
      // sessionStorage.setItem("doctorUsername", JSON.stringify(storageObj));
      // console.log(sessionStorage.getItem("doctorUsername"));

      $http({
          method: "POST",
          url: backend + "registration/slogin/",
          data: jsnObj
        })
        .then(
          function Success(response) {
            $scope.myWelcome = response.data;
            console.log($scope.myWelcome);
            var Resp = $scope.myWelcome;
            // if (Resp == "doctor") {
            //   window.alert("Login Successful");
            //   window.location.assign("DoctorDashboard.html");  
            // }
            // else{
            //   window.alert("wrong credientials");
            // }

          },
          function Error(response) {
            $scope.myWelcome = response.statusText;
            window.alert("cannot process request");
            console.log($scope.myWelcome);
          });

    }

  }
})();