$(document).ready(function () {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var postId;

  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/cms?post_id=1, postId is 1
  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId);
  }

  // Getting jQuery references to the post body, title, form, and  select
  var customerReservationForm = $("#reservationForm"); // Reservation Form
  var titleInput = $("#title"); // Customer Name
  var mobileInput = $("#mobile"); // Mobile Number
  var emailInput = $("#email"); // Email
  var postCategorySelect = $("#category"); // Select Barber
  var bodyInput = $("#datepicker") // Select Date
  var postTime = $("#time"); // Select Time

  // Giving the postCategorySelect a default value
  postCategorySelect.val(" ");

  // Adding an event listener for when the form is submitted
  $(customerReservationForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();

    // User input validation
    // Will not submit the post if we are missing a Customer Name, Mobile Number, Email, Barber Selection, Date Selection, Time Selection
    if (!titleInput.val().trim() || !mobileInput.val().trim() || !emailInput.val().trim() || !postCategorySelect.val().trim() || !bodyInput.val().trim() || !postTime.val().trim()) {
      console.log("Please fill out all fields before submitting!");

      // Show the modal with alerting the user to fill out all fields
      $("#pleaseFillAllFieldsModal").modal("toggle");

      return;
    }

    // Show Modal 1 confirming the user's appointment before submitting
    $("#confirmModal").modal("toggle");
    let resDate;
    if ((bodyInput.val()[5] == 0) && (bodyInput.val()[6] == 1)) {
      resDate = "January";

    } else if ((bodyInput.val()[5] == 0) && (bodyInput.val()[6] == 2)) {
      resDate = "February";

    } else if ((bodyInput.val()[5] == 0) && (bodyInput.val()[6] == 3)) {
      resDate = "March";

    } else if ((bodyInput.val()[5] == 0) && (bodyInput.val()[6] == 4)) {
      resDate = "April";

    } else if ((bodyInput.val()[5] == 0) && (bodyInput.val()[6] == 5)) {
      resDate = "May";
      // bodyInput.val()[6] = "May"
      // bodyInput.val()[7] = " "
    } else if ((bodyInput.val()[5] == 0) && (bodyInput.val()[6] == 6)) {
      resDate = "June";

    } else if ((bodyInput.val()[5] == 0) && (bodyInput.val()[6] == 7)) {
      resDate = "July";

    } else if ((bodyInput.val()[5] == 0) && (bodyInput.val()[6] == 8)) {
      resDate = "August";

    } else if ((bodyInput.val()[5] == 0) && (bodyInput.val()[6] == 9)) {
      resDate = "September";

    } else if ((bodyInput.val()[5] == 1) && (bodyInput.val()[6] == 0)) {
      resDate = "October";

    } else if ((bodyInput.val()[5] == 1) && (bodyInput.val()[6] == 1)) {
      resDate = "November";

    } else if ((bodyInput.val()[5] == 1) && (bodyInput.val()[6] == 2)) {
      resDate = "December";
    }

    // Populate Modal 1 with appointment data
    $("#modalConfirmReservationBarber").html(postCategorySelect.val());
    $("#modalConfirmReservationDate").html(resDate + " " + bodyInput.val()[8] + bodyInput.val()[9]);
    $("#modalConfirmReservationTime").html(postTime.val());

  });


  // When the confirmButton on Modal 1 is clicked
  $(".confirmButton").click(function () {

    // Constructing a newPost object to hand to the database
    var newPost = {
      customer_name: titleInput.val().trim(), // Customer Name
      customer_phone: mobileInput.val(), // Mobile Number
      customer_email: emailInput.val(), // Email
      barber_name: postCategorySelect.val(), // Barber
      reservation_date: bodyInput.val().trim(), // Reservation Date
      reservation_time: postTime.val() // Reservation Time
    };

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {

      newPost.id = postId;
      updatePost(newPost);
    } else {
      submitPost(newPost);
    }

  })

  // Submits a new post and brings user to the reservationSuccessModal function upon completion
  function submitPost(Post) {
    // console.log(Post)
    $.post("/api/reservations/", Post, function () {
      console.log("New reservation submitted!");
      reservationSuccessModal();
    });
  }

  // Gets post data for a post if we're editing
  function getPostData(id) {
    $.get("/api/reservations/" + id, function (data) {
      if (data) {
        // If this post exists, prefill our reservation forms with its data
        titleInput.val(data.customer_name); // Customer Name
        mobileInput.val(data.customer_phone) // Mobile
        emailInput.val(data.customer_email) // Email
        postCategorySelect.val(data.barber_name); // Select Barber
        bodyInput.val(data.reservation_date); // Select Date
        postTime.val(data.reservation_time); // Select Time

        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given post, bring user to the barberPortal page when done
  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/reservations/",
      data: post
    }).then(function () {
      window.location.href = '/barberPortal.html';
    });
    console.log(post);

  }

  // Function to open Modal 3 to let the customer know the reservation was made successfully
  function reservationSuccessModal() {
    $("#successModal").modal("toggle");

    // Include Barber name in Modal 3
    $("#modalSuccessReservationBarber").html(postCategorySelect.val());

    $(".successModalCloseButton").click(function () {
      window.location.href = "/makeReservation";
    });
  }
});