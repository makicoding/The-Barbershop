$(document).ready(function () {

  // reservationContainer holds all of our posts
  var reservationContainer = $(".reservation-container");
  var postCategorySelect = $("#category");

  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  postCategorySelect.on("change", handleCategoryChange);
  var posts;

  // This function grabs posts from the database and updates the view
  function getPosts(barber) {
    var categoryString = barber || "";
    if (categoryString) {
      categoryString = "/barber/" + categoryString;
    }
    $.get("/api/reservations" + categoryString, function (data) {
      // console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty();
      } else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
        method: "DELETE",
        url: "/api/reservations/" + id
      })
      .then(function () {
        getPosts(postCategorySelect.val());
      });
  }

  // Getting the initial list of posts
  getPosts();
  
  // InitializeRows handles appending all of our constructed post HTML inside
  // reservationContainer
  function initializeRows() {
    reservationContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    reservationContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
 
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    
    var newPostTitle = $("<h2>");
    newPostTitle.text(post.barber_name + " ");
    newPostTitle.addClass("card-title");

    var newPostDate = $("<small>");

    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");

    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");

    var newPostCategory = $("<h5>");
    newPostCategory.css({
      "font-size": "20px",
      "position": "absolute",
      "right": "25px",
      "bottom": "20px",
    });
  
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");

    var newPostBody1 = $("<p>");
    newPostBody1.text("Customer: " + post.customer_name);

    var newPostBody2 = $("<p>");
    newPostBody2.text("Reservation: " + post.reservation_date + " at " + post.reservation_time);
    
    var newPostBody3 = $("<p>");
    newPostBody3.text("Email: "  + post.customer_email);
    
    var newPostBody4 = $("<p>");
    newPostBody4.text("Phone: " + post.customer_phone);

    var formattedDate = new Date(post.createdAt);
    //formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    //newPostDate.text(formattedDate);

    newPostTitle.append(newPostDate);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    newPostCardHeading.append(newPostCategory);
    newPostCardBody.append(newPostBody1);
    newPostCardBody.append(newPostBody2);
    newPostCardBody.append(newPostBody3);
    newPostCardBody.append(newPostBody4);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);
    return newPostCard;
  }

  // This function figures out which post we want to delete and then calls
  // deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/makeReservation?post_id=" + currentPost.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
    reservationContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({
      "text-align": "center",
      "margin-top": "50px"
    });
    messageH2.html("No reservations yet for this barber, <a href='/makeReservation'>click here</a> to create a new reservation.");
    reservationContainer.append(messageH2);
  }

  // This function handles reloading new posts when the category changes
  function handleCategoryChange() {
    var newPostCategory = $(this).val();
    getPosts(newPostCategory);
  }

  // This function is for the Refresh Data Button and when clicked, it reloads the page
  function pageReload() {
    $(".refreshDataButton").click(function() {
      location.reload();
    });
  }
  pageReload();

});
