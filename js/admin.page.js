

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
          {defaultContent: "<button>Slet</button>"}
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
              {defaultContent: "<button>Slet</button>"}
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
  /*$('#booksTable').on( 'click', 'Slet', function (e) {
    e.preventDefault();

    Slet
        .title( 'Slet bog' )
        .message( "Er du sikker på du ønsker at slette denne bog?" )
        .buttons( { "label": "Delete", "fn": function () { book.submit() } } )
        .remove( $(this).closest('tr') );
  } );
  function deleteBook(btn) {
    var book = bnt.parentNode.parentNode;
    book.parentNode.removeChild(book);
  }*/
  
  
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

  $("#logOutLink").on("click", function(){
    SDK.logOut();
    window.location.href = "index.html";
  });

