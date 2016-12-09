
/**
 * Get all ads
 */

function getAds() {

    var reserveAd;

    SDK.Ad.getAll(function (err, data) {
        reserveAd = data;
        if (err) throw JSON.stringify(err);

        $("#allAdsTable").DataTable({
            data: data,
            columns: [
                {data: "isbn"},
                {data: "bookTitle"},
                {data: "rating"},
                {data: "price"},
                {defaultContent: "<button id='reserveBookButton'>Reservér bog</button>"}

            ]
        });
    });
}


/**
 * Reserve ad
 */

function reserveAd (selectedAd) {

    var ad = selectedAd.data();

    $("#adISBN").val(ad.isbn);
    $("#adTitle").val(ad.bookTitle);
    $("#adEdition").val(ad.bookEdition);
    $("#adRating").val(ad.rating);
    $("#adPrice").val(ad.price);
    $("#adComment").val(ad.comment);
    $("#adUser").val(ad.userUsername);
    $("#adPhonenumber").val("");
    $("#adMobilePay").val("");
    $("#adCash").val("");
    $("#adTransfer").val("");


    $("#reserveAdModal").modal();

}



