/**
 * Update user
 */

//Virker delvist
//function updateUser (user) {

    $("#updateUserButton").on("click", function updateUser(user){

    var userId = user.userId;
    var username = $("#updateUsername").val();
    var password = $("#updatePassword").val() ;
    var email = $("#updateEmail").val();
    var phonenumber = +$("#updatePhonenumber").val();
    var address = $("#updateAddress").val();
    var mobilepay = + $("#updateMobilePay").prop("checked");
    var cash = +$("#updateCash").prop("checked");
    var transfer = +$("#updateTransfer").prop("checked");

    $.ajax({
        url: "https://localhost:8000/updateuser",
        dataType: "json",
        type: "POST",
        xhrFields: {withCredentials: true},
        data: JSON.stringify({
           "userId": userId,
            "username": username,
            "password": password,
            "email": email,
            "phonenumber": phonenumber,
            "address": address,
            "mobilepay": mobilepay,
            "cash": cash,
            "transfer": transfer
        }),

        success: function (){
            window.location.href = "user.html";
            alert("Du har nu opdateret dine brugeroplysninger!");

        },
        error: function (data){
            alert("Brugernavn, email eller adresse eksisterer måske allerede, prøv igen!");
            alert(JSON.stringify(data))
        }
    })

});


/**
 * Slet bruger
 */


function deleteUser() {

    var $deleteUser = $(this);

    var userId = {
        userId: $deleteUser.data("userId")
    };

    SDK.User.delete(userId, function (err) {
        if (err) throw JSON.stringify(err);

        window.location.href ="index.html";

        window.alert("Du har nu slettet din bruger!");


    });
}
