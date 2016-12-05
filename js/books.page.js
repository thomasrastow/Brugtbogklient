/**
 * Get all books
 */

    function getAllBooks() {
        //Fires on page-load
        SDK.Book.getAll(function (err, data) {
            if (err) throw JSON.stringify(err);

            $("#booksTableBody").DataTable({
                data: data,
                columns: [
                    {data : "isbn"},
                    {data : "title"},
                    {data : "author"},
                    {data : "edition"}
                ]
            });

        })
    }



