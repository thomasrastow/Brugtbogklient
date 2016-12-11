/**
 * Update user
 */

/*
$("#updateUserButton").on("click", function () {


    var $username = $("#updateUsername").val()

    var $password = $("#updatePassword").val()

    var $email = $("#updateEmail").val()

    var $phonenumber = parseInt($("#updatePhonenumber").val())

    var $address = $("#updateAddress").val()


    var mobilepayIsChosen = 0;
    if ($("input[name=mobilepay]:checked").val()) {
        mobilepayIsChosen = 1;

    }

    var cashIsChosen = 0;
    if ($("input[name=cash]:checked").val()) {
        cashIsChosen = 1;
    }

    var transferIsChosen = 0;
    if ($("input[name=transfer]:checked").val()) {
        transferIsChosen = 1;
    }


    //Create JSON object
    var user = {

        username: $username,
        password: $password,
        phonenumber: $phonenumber,
        address: $address,
        email: $email,
        mobilepay: mobilepayIsChosen,
        cash: cashIsChosen,
        transfer: transferIsChosen
    };


//Update user
    SDK.User.update(user, function (err) {
        if (err) throw JSON.stringify(err);

        alert("Ændringerne er gemt!");

        window.location.href = "user.html";
    });
});
*/


//Virker delvist
function updateUser() {

    var user = {
        username: $("#updateUsername").val(),
        password: $("#updatePassword").val(),
        email: $("#updateEmail").val(),
        phonenumber: + $("#updatePhonenumber").val(),
        address: $("#updateAddress").val(),
        mobilepay: + $("#updateMobilePay").prop("checked"),
        cash: + $("#updateCash").prop("checked"),
        transfer: + $("#updateTransfer").prop("checked")

    };




    //Update user
    SDK.User.update(user, function (err) {
        if(err) throw JSON.stringify(err);

        alert("Du har nu opdateret din bruger");

        window.location.href = "user.html";
    });

}


/* Når jeg klikker "Opdater bruger" går den direkte til error meddelelsen
function updateUser() {
    var username = $("#updateUsername").val();
    var password = $("#updatePassword").val();
    var email = $("#updateEmail").val();
    var phonenumber = +$("#updatePhonenumber").val();
    var address = $("#updateAddress").val();
    var mobilePay = +$("#updateMobilePay").prop("checked");
    var cash = +$("#updateCash").prop("checked");
    var transfer = +$("#updateTransfer").prop("checked");

    $.ajax({
        url: "https://localhost:8000/updateuser",
        dataType: "json",
        type: "POST",
        xhrFields: {withCredentials: true},
        data: JSON.stringify({
            "username": username,
            "password": password,
            "email": email,
            "phonenumber": phonenumber,
            "address": address,
            "mobilePay": mobilePay,
            "cash": cash,
            "transfer": transfer
        }),

        success: function (data) {
            alert("Du har nu opdateret din bruger");
            alert(JSON.stringify(data))
        },
        error: function (data) {
            alert("Det var ikke muligt at opdatere din bruger");
            alert(JSON.stringify(data))
        }
    });
}
*/
/**
 * Slet bruger
 */

function deleteUser(e) {

    var $deleteUser = $(this);

    var userId = {
        id: $deleteUser.data("userid")
    };

    SDK.User.delete(userId, function (err) {
        if (err) throw JSON.stringify(err);
        alert("Du har nu slettet din bruger!");
        e.preventDefault();
        window.location.href = "index.html";
    })

}


/*
function deleteUser (currentUser) {

    var user = currentUser.data();
    console.log(user);
    console.log(user.userId);

    $.ajax({
        url: "https://localhost:8000/deleteuser",
        type: "POST",
        dataType: "json",
        xhrFields: {withCredentials: true},
        data: JSON.stringify({
            "id" : user.userId
        }),

        success: function (data) {
            alert("Du har nu slettet din bruger!");
            console.log(JSON.stringify(data));
        },

        error: function (data) {
            alert(JSON.stringify(data));
        }
    })
}
*/