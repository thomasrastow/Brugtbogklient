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
            "id": ad.adId
        }),

        success: function (data) {
            $('#myAdsTable').DataTable().row( $(selectedAd).parents('tr') ).remove().draw();
            alert("Du har nu slettet følgende annonce: " + ad.isbn );
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

function editAd (selectedAd) {


    var ad = selectedAd.data();


        //$("#updateAdIsbn").val(ad.isbn);
        $("#updateAdPrice").val(ad.price);
        $("#updateAdRating").val(ad.rating);
        $("#updateAdComment").val(ad.comment);

        $("#updateAdModal").modal();

}

function updateAd () {

    var ad = {
        //isbn: +$("#updateAdIsbn").val(),
        price: +$("#updateAdPrice").val(),
        rating: +$("#updateAdRating").val(),
        comment: +$("#updateAdComment").val()
    };

    //Update ad
    SDK.Ad.update(ad, function (err, data) {
        if(err) throw JSON.stringify(err);

        alert("Du har nu opdateret følgende annonce: " + ad.isbn);
        console.log(JSON.stringify(data));

        $("#updateAdModal").modal("hide");
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

        alert("Du har nu oprettet følgende annonce: " + ad.isbn + " med kommentaren: " + ad.comment );
        console.log(JSON.stringify(data));

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
