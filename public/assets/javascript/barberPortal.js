$(document).ready(function () {
  // blogContainer holds all of our posts
  var blogContainer = $(".blog-container");
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
  // blogContainer
  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    blogContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    var newPostCategory = $("<h5>");
    // newPostCategory.text(post.customer_name);
    newPostCategory.css({
      //float: "left",
      //"font-weight": "700",
      "font-size": "20px",
      "position": "absolute",
      "right": "25px",
      "bottom": "20px",
    });
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    newPostTitle.text(post.barber_name + " ");
    newPostTitle.css({
      "font-size": "30px",
      "margin-top": "8px"
    });
    //newPostBody.text(post.date);
    newPostBody.text(post.customer_name + " at " + post.reservation_time 
    + " on " + post.reservation_date  + ", " + " Email: "  + post.customer_email + " Phone: " + post.customer_phone);
    newPostBody.css({
      "font-size": "20px",
      "position": "relative",
      "top": "10px",
    })

    var formattedDate = new Date(post.createdAt);
    //formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    //newPostDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostCategory);
    newPostCardBody.append(newPostBody);
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
  // Appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/makeReservation?post_id=" + currentPost.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({
      "text-align": "center",
      "margin-top": "50px"
    });
    messageH2.html("No reservations yet for this barber, <a href='/makeReservation'>click here</a> to create a new reservation.");
    blogContainer.append(messageH2);
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
