/**
 * Get my reservations
 */

function getMyReservations() {
    //Fires on page-load

    SDK.Reservation.getMyReservations(function (err, data) {
        if (err) throw JSON.stringify(err);

        $("#myReservationsTable").DataTable({
            data: data,
            columns: [
                {data: "bookIsbn"},
                {data: "userUsername"},
                {data: "userPhonenumber"},
                {defaultContent: "<button id='removeReservationButton'>Fjern reservation</button>"}
            ]
        })
    });
}


/**
 * Remove reservation
 */

function removeReservation(selectedAd) {

    var ad = selectedAd.data();
    console.log(ad);
    console.log(ad.adId);

    $.ajax({
        url: "https://localhost:8000/deletereservation",
        type: "POST",
        dataType: "json",
        xhrFields: {withCredentials: true},
        data: JSON.stringify({
            "adId": ad.adId
        }),
        success: function (data) {
            alert("Du har nu fjernet denne reservation");
            console.log(JSON.stringify(data));
            location.reload();
        },
        error: function (data) {
            alert("Der skete en fejl, prøv igen");
            alert(JSON.stringify(data))
        }
    });
}
