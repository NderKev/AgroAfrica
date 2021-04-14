$(document).ready(function(){
  //  e.preventDefault()
   let AUTH_BACKEND_URL = 'http://agro-africa.io';
   var logout = document.getElementById("logout")
    var isLoggedIn = localStorage.getItem("agroAfric_user_name");
    var role = localStorage.getItem("role");
    console.log(isLoggedIn);
    if (typeof isLoggedIn === 'undefined' || isLoggedIn === null || !isLoggedIn || role !== 'customer'){
      window.location.href = "/";
    }
    else{
      var UserName = localStorage.getItem("agroAfric_user_name");
      $("#name").text(UserName)
      //window.location.href = 'complete_profile.html?id='+localStorage.getItem("user_id");///https://agro-africa.io/agroAfrica/v1/user/profile/" + //localStorage.getItem('user_id') + "complete_profile.html";
      $(logout).click(function(){
        localStorage.setItem('agroAfric_user_name', "");
        //$("#name").html('');
        localStorage.setItem('user_id',"");
        localStorage.setItem('auth_token_agroAfric',"");
        localStorage.setItem('product', "");
        localStorage.setItem('cart', "");
        localStorage.setItem('product', "");
        localStorage.setItem('cart_id', "");
        localStorage.setItem('order', "");
        localStorage.setItem('order_id', "");
        localStorage.setItem('role', "");
      $.ajax({
            url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/logout`,
            dataType: "JSON",
            contentType: "application/json",
            method: "POST",
            data : {},
            error: (err) => {
                $("#placement_error_log").html(err.mesage);
             },
            success: function (results) {
                window.location.href = "/";
            }
       })
      })

    function refresh(){
      $("#phone").val('')
      $("#street").val('')
      $("#city").val('')
      $("#zipcode").val('')
      $("#state").val('')
      $("#country").val('')
      $("#about").val('')
    }
  var user = localStorage.getItem("user_id");
    $.ajax({
      url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/fetch/${user}`,
      dataType: "JSON",
      contentType: "application/json",
      method: "GET",
      error: (err) => {
        alert("error");
        window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem("role")+'/profile/'+localStorage.getItem("user_id") + '/';
      },
      success: function(results){
        if (results.data.length>0){
          console.log(results.data);
          //$("#user_name").val(results.data[0].name)
          //$("#email").val(results.data[0].email)
          $("#phone").val(results.data[0].phone)
          $("#street").val(results.data[0].street)
          $("#city").val(results.data[0].city)
          $("#zipcode").val(results.data[0].zipcode)
          $("#state").val(results.data[0].state)
          $("#country").val(results.data[0].country)
          $("#about").val(results.data[0].about_me)
        }
      }
    })

    $("#updateProf").click(function(e){
                e.preventDefault()

                  let email = localStorage.getItem("agroAfric_user_name");
                  let telephone = document.getElementById('phone').value
                  let street = document.getElementById('street').value
                  let city = document.getElementById('city').value
                  let zipcode = document.getElementById('zipcode').value
                  let state = document.getElementById('state').value
                  let country = document.getElementById('country').value
                  let about = document.getElementById('about').value
                  if(email === '') {
                      $("#placement_error_log").html('*Email is required')
                      return
                  }
                  $.ajax({
                        url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/updateProfile`,
                        dataType: "JSON",
                        contentType: "application/json",
                        method: "POST",
                        data: JSON.stringify({
                            'email': email,
                            'telephone' : telephone,
                            'street' : street,
                            'city': city,
                            'zipcode' : zipcode,
                            'state' : state,
                            'country' : country,
                            'about' : about,
                            'latitude': localStorage.getItem("latitude") || 37.580078,
                            'longitude': localStorage.getItem("longitude") || -35.486104
                        }),
                        error: (err) => {
                          refresh();
                            if(err.status === 403) {
                                //alert(err.message);
                                $("#placement_error_log").html('User Not Registered or Wrong Email');
                            }
                            else{
                              $("#placement_error_log").html('Incorrect Details or Server Error');
                            }
                        },
                        success: function (results) {
                            alert("Profile successfully updated");
                            refresh();
                            var user = localStorage.getItem("user_id");
                            window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem("role")+'/profile/'+localStorage.getItem("user_id") + '/';
                        }
                })
              })
              function getLocation() {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(showPosition);
                } else {
                  alert("Geolocation is not supported by this browser.");
                }
              }

              function showPosition(position) {
                //alert("success");
                localStorage.setItem('latitude', position.coords.latitude);
                localStorage.setItem('longitude', position.coords.longitude);
                console.log("Latitude: " + localStorage.getItem("latitude") +
                "Longitude: " + localStorage.getItem("longitude") );
              }
              getLocation()
            }
  })

  setInterval(function(){
    const AUTH_BACKEND_URL = 'http://agro-africa.io';
      $.ajax({
        url: `${AUTH_BACKEND_URL}/agroAfrica/v1/user/${localStorage.getItem("role")}/profile/${localStorage.getItem("user_id")}/`,
        dataType: "JSON",
        contentType: "application/json",
        method: "GET",
        error: (err) => {
          if (err.status === 401){
          alert("Session Expired! Kindly login again");
          localStorage.setItem('agroAfric_user_name', "");
          localStorage.setItem('role', "");
          window.location.href = "/";
        }
        },
        success: function(results){

        }
      });
    }, 1800000);
