

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
          {data : "edition"},
          {defaultContent: "<button>Slet bog</button>"}
        ]
    });

   })
  }

  function getAllUsers () {
    //Fires on page-load
    SDK.User.getAll(function (err, data) {
      if (err) throw JSON.stringify(err);

      $("#usersTable").DataTable({
            data: data,
            columns: [
              {data : "username"},
              {data : "email"},
              {data : "phonenumber"},
              {data : "userId"},
              {defaultContent: "<button>Slet bruger</button>"}
            ]
          }

      )
    });
  }

  var currentUser = SDK.User.current();
  $("#currentUsername").text(currentUser.firstName +  " " + currentUser.lastName);

  /**
   * Add a new book
   */
function createBook() {
    //Create JSON object
    var book = {
      isbn: +$("#bookIsbn").val(),
      title: $("#bookTitle").val(),
      author: $("#bookAuthor").val(),
      edition: $("#bookEdition").val()
    };


    //Create book
    SDK.Book.create(book, function(err, data){
      if(err) throw JSON.stringify(err);

      alert(JSON.stringify(data));

      $("#newBookModal").modal("hide");
    });

  }

  /**
   * Delete book
   */


  /*function deleteBook() {
    $('#booksTable').on('click', 'book_remove', function (e) {
      e.preventDefault();

      deleteBook
          .title('Slet bog')
          .message("Er du sikker på, at du vil slette denne bog?")
          .buttons({
            "label": "Slet", "fn": function () {
              deleteBook.submit()
            }
          })
          .remove($(this).closest('tr'));
    })
  }
  */

// Kør lige igen haha
  function deleteBook (rowBook) {

    var book = rowBook.data();
    console.log(book);
    console.log(book.isbn);

    $.ajax({
      url: "https://localhost:8000/deletebook",
      type: 'POST',
      dataType: "json",
      xhrFields: {withCredentials: true},
      data: JSON.stringify({
        "isbn" : book.isbn
      }),

      success: function (data) {
        $('#booksTable').DataTable().row( $(rowBook).parents('tr') ).remove().draw();
        alert("Bogen: " + book.title +" med ISBN: "+ book.isbn + " er slettet." );
        console.log(JSON.stringify(data));
      },

      error: function(data) {
        alert(JSON.stringify(data));
      }
    })


  }


  
  /**
   * Add a new user
   */
  function createUser() {
  //Create JSON object
  var user = {
    username:  $("#userUsername").val(),
    password:  $("#userPassword").val(),
    phonenumber: + $("#userPhonenumber").val(),
    address:  $("#userAddress").val(),
    email:  $("#userEmail").val(),
    mobilepay: + $("#userMobilePay").prop("checked"),
    cash: + $("#userCash").prop("checked"),
    transfer: + $("#userTransfer").prop("checked")
  };

  //Create user
  SDK.User.create(user, function(err, data) {
    if(err) throw JSON.stringify(err);

    alert(JSON.stringify(data));

    $("#newUserModal").modal("hide");
  });

}

  /**
   * Delete user
   */


  $("#logOutLink").on("click", function(){
    SDK.logOut();
    window.location.href = "index.html";
  });

