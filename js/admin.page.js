/**
 * Get all books
 */

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

/**
 * Get all users
 */

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

  function deleteBook (selectedBook) {

    var book = selectedBook.data();
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
        $('#booksTable').DataTable().row( $(selectedBook).parents('tr') ).remove().draw();
        alert("Du har nu slettet følgende bog: " + book.title +" med ISBN: "+ book.isbn);
        console.log(JSON.stringify(data));
      },

      error: function (data) {
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

function deleteUser(selectedUser) {

  var user = selectedUser.data();
  console.log(user);
  console.log(user.id);

  $.ajax({
    url: "https://localhost:8000/deleteuser",
    type: "POST",
    dataType: "json",
    xhrFields: {withCredentials: true},
    data: JSON.stringify({
      "id" : user.id
    }),

    success: function (data) {
      $('#usersTable').DataTable().row( $(selectedUser).parents('tr') ).remove().draw();
      alert("Du har nu slettet følgende bruger: " + user.id +"med brugernavn: "+user.username);
      console.log(JSON.stringify(data));
    },

    error: function (data) {
      alert(JSON.stringify(data));
    }
  })
}

/**
* Log out
 */

  $("#logOutLink").on("click", function(){
    SDK.logOut();
    window.location.href = "index.html";
  });

