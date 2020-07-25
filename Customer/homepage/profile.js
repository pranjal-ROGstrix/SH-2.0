function initMap(loc) {
    var origin = {
        lat: 28.7040592,
        lng: 77.10249019999999
    }
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 7,
            center: origin
        });
    var marker = new google.maps.Marker({
        position: loc,
        map: map
    });
}
(function () {
    var myApp = angular.module('myApp', []);
    myApp.controller('profileCtrl', function ($http, $window) {
        let profile = this;
        profile.geolocation = () => {
            console.log(profile.address)
            $http({
                url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + profile.address + '&key=AIzaSyDyJe4yLMHd2Rd6Km6z5thlj9ZIvaBJqO8',
                method: 'GET',
            }).then(
                mySuccess = (response) => {
                    console.log(response)
                    profile.lat = response.data.results[0].geometry.location.lat;
                    profile.lng = response.data.results[0].geometry.location.lng;
                    console.log(profile)
                    let loc = {
                        lat: profile.lat,
                        lng: profile.lng
                    }
                    initMap(loc)
                }
            )
        }
        profile.saveAddress = () => {
            $http({
                    url: window.url + 'registration/update/',
                    method: 'POST',
                    data: {
                        "id": sessionStorage.id,
                        "address": profile.address,
                        "latitude": profile.lat,
                        "longitude": profile.lng
                    }
                })
                .then(
                    mysuccess = (response) => {
                        console.log(response)
                        if (response.data == "Success") {
                            sessionStorage.address = profile.address;
                            $window.location.href = "index.html"
                        }
                    },
                    myerror = (response) => {
                        console.log(response)
                    }
                )
        }
    })

})();