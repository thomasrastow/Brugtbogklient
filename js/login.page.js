
$(document).ready(function () {

  $("#loginButton").on("click", function(e){
    e.preventDefault();

    var username = $("#inputUsername").val();
    var password = $("#inputPassword").val();

    SDK.login(username, password, function(err, data){

      //On wrong credentials
      if(err) {
        alert("Det indtaste brugernavn eller adgangskode var forkert");
        return $("#loginForm").find(".form-group").addClass("has-error");
      }
      SDK.Storage.persist("user", data);

      //Login OK!
      $("#loginForm").find(".form-group").addClass("has-success");

      if (data.type == 1) {
        window.location.href = "admin.html";
      } else {
        window.location.href = "user.html";
      }


    });

  });

});
