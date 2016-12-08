
/**
 * Get all ads
 */

function getAds() {
    SDK.Ad.getAll(function (err, data) {
        if (err) throw JSON.stringify(err);

        $("#adsTableBody").DataTable({
            data: data,
            columns: [
                {data : "isbn"},
                {data : "bookTitle"},
                {data : "rating"},
                {data : "price"},
                {defaultContent: "<button class='reserveBookButton'>Reservér bog</button>"}

            ]
        });

/**
 * Reserve ad
 */

        $(".reserveBookButton").on("click", function (ad) {

            $("#adISBN").val(ad.isbn);
            $("#adTitle").val("");
            $("#adEdition").val("");
            $("#adRating").val("");
            $("#adComment").val("");
            $("#adPhonenumber").val("");
            $("#adMobilePay").val("");
            $("#adCash").val("");
            $("#adTransfer").val("");

            $("#reserveAdModal").modal();

        });

    });
}

