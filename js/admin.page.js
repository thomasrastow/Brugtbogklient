

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
    type: +$("#userType").val(),
  };

  //Create user
  SDK.User.create(user, function(err, data) {
    if(err) throw JSON.stringify(err);

    alert(JSON.stringify(data));
    $("#newUserModal").modal("hide");
  });

}

    //Show modal
    /*$('#newBookModal').modal('show');

    //Fetch publishers, and set to DOM
    SDK.Publisher.getAll(function (err, publishers) {
      if (err) throw err;

      var $publishersRadio = $("#publishersRadio");
      publishers.forEach(function (publisher, i) {

        $publishersRadio.append(
          '<div class="radio">' +
            '<label>' +
              '<input type="radio" name="publisherRadios" id="optionsRadios' + i + '" value="' + publisher.id + '">' +
              publisher.name +
            '</label>' +
          '</div>'
        );

      });

    });*/

    //Fetch authors, and set to DOM
    /*SDK.Author.getAll(function(err, authors){
      if (err) throw err;

      var $authorsCheckbox = $("#authorsCheckbox");
      authors.forEach(function(author, i){

        $authorsCheckbox.append(
          '<div class="checkbox">' +
            '<label>' +
              '<input type="checkbox" value="' + author.id + '">' +
              author.firstName + ' ' + author.lastName +
            '</label>' +
          '</div>'
        );

      });

    });*/

  /**
   * Add a new User
   */
  $("#addNewUserButton").on("click", function () {

  });

  $("#logOutLink").on("click", function(){
    SDK.logOut();
    window.location.href = "index.html";
  });

