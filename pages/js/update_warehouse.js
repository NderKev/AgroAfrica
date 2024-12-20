$(document).ready(function(){
    let AUTH_BACKEND_URL = 'http://agroafrica.uksouth.cloudapp.azure.com'
    let logout = document.getElementById("logout")
  //  e.preventDefault()
    var role = localStorage.getItem("role");
    var isLoggedIn = localStorage.getItem("agroAfric_user_name");
    console.log(isLoggedIn);
    if (typeof isLoggedIn === 'undefined' || isLoggedIn === null || !isLoggedIn || role !== 'seller' && role !== 'admin'){
      window.location.href = "/";
    }
    else{
      var UserName = localStorage.getItem("agroAfric_user_name");
      $("#name").text(UserName)
      $(logout).click(function(){
      localStorage.setItem('agroAfric_user_name', "");
      localStorage.setItem('user_id',"");
      localStorage.setItem('auth_token_agroAfric',"");
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


      let warehouse = localStorage.getItem("warehouse");
      $.ajax({
      url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/warehouse/${warehouse}`,
      dataType: "JSON",
      contentType: "application/json",
      method: "GET",
      error: (err) => {
        alert("error");
        //window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem("role")+'/profile/'+localStorage.getItem("user_id") + '/';
        window.open('', '_self').close();
      },
      success: function(results){
        if (results.data.length>0){
          //console.log(results.data);
          //$("#user_name").val(results.data[0].name)
          $("#warehouse_name").val(results.data[0].name)
          $("#picture").val(results.data[0].picture)
          $("#email").val(results.data[0].email)
          $("#phone").val(results.data[0].phone)
          $("#street").val(results.data[0].street)
          $("#city").val(results.data[0].city)
          $("#zipcode").val(results.data[0].zipcode)
          $("#state").val(results.data[0].state)
          $("#about").val(results.data[0].about_us)
          //localStorage.setItem('seller_id',results.data[0].id)
        }
      }
      });

      function refresh(){
        $("#warehouse_name").val('')
        $("#picture").val('')
        $("#email").val('')
        $("#city").val('')
        $("#zipcode").val('')
        $("#state").val('')
        $("#street").val('')
        $("#about").val('')
        $("#phone").val('')
      }

      $("#updateWarehouse").click(function(e){
          e.preventDefault()

            let email =  document.getElementById('email').value
            let name = document.getElementById('warehouse_name').value
            let pictures = document.getElementById('picture').value
            let city = document.getElementById('city').value
            let zipcode = document.getElementById('zipcode').value
            let state = document.getElementById('state').value
            let street = document.getElementById('street').value
            let country = document.getElementById('country').value
            let telephone = document.getElementById('phone').value
            let about = $.trim($("#about").val());

            //about = about + ".\r\n"
            if(email === '') {
                $("#placement_error_log").html('*Email is required')
                return
            }
            $.ajax({
                  url: `${AUTH_BACKEND_URL}/agroAfrica/v1/order/warehouse/${warehouse}`,
                  dataType: "JSON",
                  contentType: "application/json",
                  method: "PUT",
                  data: JSON.stringify({
                     'warehouse_id': warehouse,
                     'name' : name,
                     'email' : email,
                     'city' : city,
                     'street' : street,
                      'state': state,
                      'about_us' : about,
                      'pictures' : pictures,
                      'phone': telephone,
                      'zipcode' : zipcode,
                      'latitude': localStorage.getItem("latitude"),
                      'longitude': localStorage.getItem("longitude")
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
                     if (results.status === 201 && results.message === 'created'){
                      //alert("Profile successfully updated");
                      refresh();
                      var user = localStorage.getItem("user_id");
                      window.open('', '_self').close();
                      //window.location.href = '/agroAfrica/v1/user/'+localStorage.getItem("role")+'/profile/'+localStorage.getItem("user_id") + '/';//'products.html?id='+user;
                    }
                  }
          })
        })

        const handleImageUpload = event => {
          const files = event.target.files
          const myImage = files[0]
          const imageType = /image.*/

          if (!myImage.type.match(imageType)) {
              alert('Sorry, only images are allowed')
              return
            }

          if (myImage.size > (1000*1024)) {
              alert('Sorry, the max allowed size for images is 1MB')
              return
            }

          const formData = new FormData()
          formData.append('myFile', files[0])
          //formData.append('filePath', nextProd)
          fetch('/agroAfrica/v1/upload/saveWarehouse', {
            method: 'POST',
            body: formData
          })
          .then(response => response.json())
          .then(data => {
            console.log(data.path)
            $("#picture").val(data.path);
          })
          .catch(error => {
            console.error(error)
          })
        }

 document.querySelector('#fileUpload').addEventListener('change', event => {
  handleImageUpload(event)
 })

      //window.location.href = 'complete_profile.html?id='+localStorage.getItem("user_id");///http://agroafrica.uksouth.cloudapp.azure.com//agroAfrica/v1/user/profile/" + //localStorage.getItem('user_id') + "complete_profile.html";
    }
  })


  setInterval(function(){
    const BACKEND_URL = 'http://agroafrica.uksouth.cloudapp.azure.com';
      $.ajax({
        url: `${BACKEND_URL}/agroAfrica/v1/user/${localStorage.getItem("role")}/profile/${localStorage.getItem("user_id")}/`,
        dataType: "JSON",
        contentType: "application/json",
        method: "GET",
        error: (err) => {
          if (err.status === 401){
          alert("Session Expired! Kindly login again");
          localStorage.setItem('agroAfric_user_name', "");
          localStorage.setItem('role', "");
          window.location.href = "/admin.html";
        }
        },
        success: function(results){

        }
      });
    }, 1800000);
