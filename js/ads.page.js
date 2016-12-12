

/**
 * Get all ads
 */

function getAds() {

    //var reserveAd;

    SDK.Ad.getAll(function (err, data) {
        //reserveAd = data;
        if (err) throw JSON.stringify(err);

        $("#allAdsTable").DataTable({
            data: data,
            columns: [
                {data: "isbn"},
                {data: "bookTitle"},
                {data: "rating"},
                {data: "price"},
                {defaultContent: "<button id='infoAdButton'>Info</button>"},
                {defaultContent: "<button id='reserveAdButton'>Reserver</button>"}

            ]
        });
    });
}


/**
 * Reserve ad
 */

//Info about ad
function infoAd (selectedAd) {

    var ad = selectedAd.data();

    console.log(ad);


    $("#adISBN").val(ad.isbn);
    $("#adTitle").val(ad.bookTitle);
    $("#adEdition").val(ad.bookEdition);
    $("#adRating").val(ad.rating);
    $("#adPrice").val(ad.price);
    $("#adComment").val(ad.comment);
    $("#adUser").val(ad.userUsername);
    $("#adMobilePay").prop("checked", ad.userMobilepay);
    $("#adCash").prop("checked", ad.userCash);
    $("#adTransfer").prop("checked",ad.userTransfer);

    $("#infoAdModal").modal();

}

//Reserve ad

function reserveAd(selectedAd) {

    var ad = selectedAd.data();
    console.log(ad);
    console.log(ad.adId);

    $.ajax({
        url: "https://localhost:8000/reservead",
        type: "POST",
        dataType: "json",
        xhrFields: {withCredentials: true},
        data: JSON.stringify({
            "adId": ad.adId
    }),
        success: function (data) {
            alert("Du har nu reserveret denne annonce");
            console.log(JSON.stringify(data));
            location.reload();
        },
        error: function (data) {
            alert("Der skete en fejl, prøv igen");
            alert(JSON.stringify(data))
        }
    });
}



