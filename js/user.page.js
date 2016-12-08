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
    SDK.Ad.getMyAds(function (err, data) {
        if (err) throw err;

        $("#myAdsTable").DataTable({
            data: data,
            columns: [
                {data : "isbn"},
                {data : "price"},
                {data : "rating"},
                {defaultContent: "<button class='deleteAdButton'>Slet</button>"},
                {defaultContent: "<button class='editAdButton'>Rediger</button>"}
            ]
        });

/**
 * Delete ad
 */

function deleteAd (selectedAd) {

    var ads = selectedAd.data();
    console.log(ads);
    console.log(ads.adid);

    $.ajax({
        url: "https://localhost:8000/deletead",
        type: "POSt",
        dataType: "json",
        xhrFields: {withCredentials: true},
        data: JSON.stringify({
            "adid": ads.adid
        }),

        success: function (data) {
            $('#myAdsTable').DataTable().row( $(selectedAd).parents('tr') ).remove().draw();
            alert("Du har nu slettet følgende annonce: " + ads.adid );
            console.log(JSON.stringify(data));
        },

        error: function (data){
            alert(JSON.stringify(data));
        }
    })

}


/**
 * Edit ad
 */

        $(".editAdButton").on("click", function () {

            $("#updateAdIsbn").val("");
            $("#updateAdPrice").val("");
            $("#updateAdRating").val("");
            $("#updateAdComment").val("");

            $("#updateAdModal").modal();
        });

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

        alert(JSON.stringify(data));

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