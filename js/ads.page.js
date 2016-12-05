
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
                {data : "price"}
            ]
        });

    })
}

