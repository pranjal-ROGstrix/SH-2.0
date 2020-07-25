(function () {
    var myApp = angular.module('myApp', []);
    myApp.controller('homeCtrl', function ($http, $window) {
        let home = this;
        if (sessionStorage.address == "null") {
            $window.location.href = "profile.html"
        } else {
            $('.shopname').hide();
            home.category = [{
                    "type": "medical"
                },
                {
                    "type": "grocerry"
                },
                {
                    "type": "general store"
                },
                {
                    "type": "departmental Store"
                },
                {
                    "type": "dupermarket"
                },
                {
                    "type": "bakery"
                }
            ]
            home.selectedCategory = (x) => {
                console.log(x)
                $('.category').hide();
                $('.shopname').show();
                $http({
                    url: window.url + 'customer/category/',
                    method: 'POST',
                    data: {
                        "shopname": x.type
                    }
                }).then(
                    mySuccess = (response) => {
                        console.log(response.data)
                        home.shops = response.data;
                    },
                    myError = (response) => {
                        console.log(response)
                    }
                )
            }
            home.selectedShop = (x) => {
                console.log(x)
                // shop

                $http({
                        method: 'POST',
                        url: window.url + 'customer/location/',
                        data: {
                            "id": x.id
                        }
                    })
                    .then(
                        mysucc = (response) => {
                            console.log(response)
                            sessionStorage.shop_address = response.data[0].address;
                            $window.location.href = "view_distance.html"
                        },
                        myfail = (response) => {
                            console.log(response)
                        }
                    )
            }
            home.signout = () => {
                sessionStorage.clear();
                $window.location.href = "../register.html"
            }
        }

    })

})();