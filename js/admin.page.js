

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
   * Add a new Book
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
   * Add a new user
   */
  function createUser() {
  //Create JSON object
  var user = {
    username: +$("#userUsername").val(),
    password: +$("#userPassword").val(),
    phonenumber: +$("#userPhonenumber").val(),
    address: +$("#userAddress").val(),
    email: +$("#userEmail").val(),
    mobilepay: +$("#userMobilePay").val(),
    cash: +$("#userCash").val(),
    transfer: +$("#userTransfer").val(),
    type: +$("#userType").val()
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

