

  /*//Fires on page-load
  SDK.Book.getAll(function(err, data){
    if(err) throw err;

    var $booksTableBody = $("#booksTableBody");
    data.forEach(function (book, i) {

      $booksTableBody.append(
        "<tr>" +
          "<td>" + book.isbn + "</td>" +
          "<td>" + book.title  + "</td>" +
          "<td>" + book.author + "</td>" +
          "<td>" + book.edition + "</td>" +
        "</tr>")
    });

  });*/
    function getAllBooks() {
        //Fires on page-load
        SDK.Book.getAll(function (err, data) {
            if (err) throw err;

            $("#booksTable").DataTable({
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



