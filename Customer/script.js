(function () {
    let url = window.url;

    let app = angular.module('app', []);

    app.controller('loginCtrl', function ($http) {
        let login = this;
        login.submit = () => {
            $http({
                    method: 'POST',
                    url: url + 'registration/login/',
                    data: {
                        "email": login.email,
                        "password": login.password
                    }
                })
                .then(
                    mysuccess = (response) => {
                        console.log(response.data)
                        if (response.data != "invalid credentials") {
                            sessionStorage.name = response.data[0].name;
                            sessionStorage.email = response.data[0].email;
                            sessionStorage.address = response.data[0].address;
                            sessionStorage.mobile_no = response.data[0].mobile_no;
                            sessionStorage.id = response.data[0].id;
                            window.location.href = "homepage/index.html";
                        } else {
                            alert(response.data)
                        }

                    },
                    myfailure = (response) => {
                        console.log(response)
                    }
                )
        }
    })

    app.controller('registrationCtrl', function ($http) {
        let reg = this;
        reg.submit = () => {
            console.log(reg)
            $http({
                    method: 'POST',
                    url: url + 'registration/',
                    data: {
                        "name": reg.name,
                        "email": reg.email,
                        "password": reg.password,
                        "mobile_no": reg.mobile_no
                    }
                })
                .then(
                    mysuccess = (response) => {
                        console.log(response)
                        if (response.data == "Registered Sucessfully") {
                            sessionStorage.email = reg.email;
                            sessionStorage.password = reg.password;
                            $http({
                                    method: 'POST',
                                    url: url + 'registration/login/',
                                    data: {
                                        "email": reg.email,
                                        "password": reg.password
                                    }
                                })
                                .then(
                                    mySuccess = (response) => {
                                        if (response.data != "invalid credentials") {
                                            sessionStorage.name = response.data[0].name;
                                            sessionStorage.email = response.data[0].email;
                                            sessionStorage.address = response.data[0].address;
                                            sessionStorage.mobile_no = response.data[0].mobile_no;
                                            sessionStorage.mobile_no = response.data[0].id;
                                            window.location.href = "homepage/index.html";
                                        } else {
                                            alert(response.data)
                                        }
                                    },
                                    myFailure = (response) => {
                                        console.log(response.data)
                                    }
                                )
                        }
                    },
                    myfailure = (response) => {
                        console.log(response)
                    }
                )
        }
    })
})();