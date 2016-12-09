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

   });
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
              {defaultContent: "<button id='deleteUserButton'>Slet bruger</button>"}
            ]
          })
    });
  }

/**
 * Delete user
 */

/*
$(".deleteUserButton").on("click", function () {

  var $deleteUser = $(this);

  var userId = {
    id : $deleteUser.data("userid")
  };

  SDK.User.delete(userId, function (err) {
    if (err) throw JSON.stringify(err);
    location.reload();
  })
});
*/

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
 * Delete user
 */

/*
function deleteUser(row) {

  var selectedUser = JSON.parse(localStorage.getItem('user'));

  var user = row.data();

  $.ajax({
    url: urlUser + "/" + user.userId,
    type: "DELETE",
    headers: {
      "authorization" : selectedUser.token
    },
    success: function(data) {
      $('#usersTable').DataTable().row( $(row).parents('tr') ).remove().draw();
      alert("Du har nu slettet følgende bruger: " + user.username);
    },
    error: function (data) {
      alert(JSON.stringify(data));
    }
    
  });
  
}
*/

function deleteUser (selectedUser) {

  var user = selectedUser.data();
  console.log(user);
  console.log(user.userId);

  $.ajax({
    url: "https://localhost:8000/deleteuser",
    type: "POST",
    dataType: "json",
    xhrFields: {withCredentials: true},
    data: JSON.stringify({
      "id" : user.userId
    }),

    success: function (data) {
      $('#usersTable').DataTable().row( $(selectedUser).parents('tr') ).remove().draw();
      alert("Du har nu slettet følgende bruger: " + user.username);
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

