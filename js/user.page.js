/**
 * Get all books
 */

function getAllBooks() {
    //Fires on page-load
    SDK.Book.getAll(function (err, data) {
        if (err) throw err;

        $("#allBooksTable").DataTable({
            data: data,
            columns: [
                {data : "isbn"},
                {data : "title"},
                {data : "author"},
                {data : "edition"}
            ]
        });

    });
}

/**
 * Get my ads
 */

function getMyAds() {
    //Fires on page-load

    var editAd;

    SDK.Ad.getMyAds(function (err, data) {
        editAd = data;
        if (err) throw JSON.stringify(err);

        $("#myAdsTable").DataTable({
            data: data,
            columns: [
                {data: "isbn"},
                {data: "price"},
                {data: "rating"},
                {defaultContent: "<button id='deleteAdButton'>Slet</button>"},
                {defaultContent: "<button id='editAdButton'>Rediger</button>"}
            ]
        })
    });
}


/**
 * Delete ad
 */

function deleteAd (selectedAd) {

    var ad = selectedAd.data();
    console.log(ad);
    console.log(ad.adId);

    $.ajax({
        url: "https://localhost:8000/deletead",
        type: "POST",
        dataType: "json",
        xhrFields: {withCredentials: true},
        data: JSON.stringify({
            "adId": ad.adId
        }),

        success: function (data) {
            $('#myAdsTable').DataTable().row( $(selectedAd).parents('tr') ).remove().draw();
            alert("Du har nu slettet følgende annonce: " + ad.isbn );
            console.log(JSON.stringify(data));
            window.location.href ="user.html";
        },

        error: function (data){
            alert(JSON.stringify(data));
        }
    })
}


/**
 * Edit ad
 */

//Autofill modal
function editAd (selectedAd) {


    var ad = selectedAd.data();

    $("#updateAdPrice").val(ad.price);
    $("#updateAdRating").val(ad.rating);
    $("#updateAdComment").val(ad.comment);

    $("#updateAdModal").modal();

    $("#updateAdButton").on("click", function(){
        updateAd(ad);
    });
}


//Update ad
function updateAd(ad) {


    var adId = ad.adId;
    var price = +$("#updateAdPrice").val();
    var rating = + $("#updateAdRating").val();
    var comment = $("#updateAdComment").val();

    $.ajax({
        url: "https://localhost:8000/updatead",
        dataType: "json",
        type: "POST",
        xhrFields: {withCredentials: true},
        data: JSON.stringify({
            "adId": adId,
            "price": price,
            "rating": rating,
            "comment": comment
        }),

        success: function () {
            alert("Du har nu opdateret din annonce!");

            window.location.href ="user.html";
        },
        error: function (data) {
            alert("Der skete en fejl, prøv igen");
            alert(JSON.stringify(data))
        }
    });
}

/**
 * Create ad
 */

function createAd() {
    //Create JSON object
    var ad = {
        isbn: +$("#adIsbn").val(),
        price: +$("#adPrice").val(),
        rating: +$("#adRating").val(),
        comment: $("#adComment").val()
    };


    //Create ad
    SDK.Ad.create(ad, function(err, data){
        if(err) throw JSON.stringify(err);

        alert("Du har nu oprettet følgende annonce: " + ad.isbn + " Med kommentaren: " + ad.comment );
        console.log(JSON.stringify(data));
        window.location.href ="user.html";

        $("#newAdModal").modal("hide");
    });

}

/**
 * Log out
 */

$("#logOutLink").on("click", function(){
    SDK.logOut();
    window.location.href = "index.html";
});
