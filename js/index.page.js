/**
 * Add a new user
 */

function createUser() {
    //Create JSON object
    var user = {
        username:  $("#userUsername").val(),
        password:  $("#userPassword").val(),
        phonenumber: + $("#userPhonenumber").val(),
        address:  $("#userAddress").val(),
        email:  $("#userEmail").val(),
        mobilepay: + $("#userMobilePay").prop("checked"),
        cash: + $("#userCash").prop("checked"),
        transfer: + $("#userTransfer").prop("checked")
    };

    //Create user
    SDK.User.create(user, function(err, data) {
        if(err) throw JSON.stringify(err);

        alert(JSON.stringify(data));

        $("#newUserModal").modal("hide");
    });

}