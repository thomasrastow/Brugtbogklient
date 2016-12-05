/**
 * Get my ads
 */

function getMyAds() {
    //Fires on page-load
    SDK.Ad.getMyAds(function (err, data) {
        if (err) throw err;

        $("#adsTable").DataTable({
            data: data,
            columns: [
                {data : "isbn"},
                {data : "price"},
                {data : "rating"},
                {defaultContent: "<button>Slet annonce</button>"}
            ]
        });

    })
}

/**
 * Create ad
 */

function createAd() {
    //Create JSON object
    var ad = {
        isbn: +$("#adIsbn").val(),
        price: $("#adPrice").val(),
        rating: $("#adRating").val(),
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