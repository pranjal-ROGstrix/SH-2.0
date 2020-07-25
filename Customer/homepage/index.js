(function () {
    var myApp = angular.module('myApp', []);
    myApp.controller('homeCtrl', function ($http, $window) {
        let home = this;
        if (sessionStorage.address == "null") {
            $window.location.href = "profile.html"
        } else {
            $('.shopname').hide();
            home.category = [{
                    "type": "Meidcal"
                },
                {
                    "type": "Grocerry"
                },
                {
                    "type": "General Store"
                },
                {
                    "type": "Departmental Store"
                },
                {
                    "type": "Supermarket"
                },
                {
                    "type": "Bakery"
                }
            ]
            home.selectedCategory = (x) => {
                console.log(x)
                $('.category').hide();
                $('.shopname').show();
            }
        }
    })

})();