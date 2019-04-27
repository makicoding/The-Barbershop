$(document).ready(function () {
  // Gets an optional query string from our url (i.e. ?reservation_id=23)
  var url = window.location.search;
  var reservationId;
  // Sets a flag for whether or not we're updating a reservation to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the reservation id from the url
  // In localhost:8080/cms?reservation_id=1, reservationId is 1
  if (url.indexOf("?reservation_id=") !== -1) {
    reservationId = url.split("=")[1];
    getReservationData(reservationId);
  }

  // Getting jQuery references to the reservation information
  //formerly bodyInput
  var reservationDate = $("#reservation-date");
  console.log(reservationDate);
  //formerly titleInput
  var customerName = $("#customer-name");
  // console.log(customerName);
  var submitReservation = $("#submitReservation");
  //formerly postCategorySelect
  var barberSelect = $("#barber");
  //formerly postTime
  var reservationTime = $("#reservation-time");

  // Giving the barberSelect a default value
  barberSelect.val("barber1");

  // Adding an event listener for when the form is submitted
  $(submitReservation).on("submit", "#reservation-form", function handleFormSubmit(event) {
    event.preventDefault();
    // Won't submit the reservation if we are missing a date or a time
    // if (!reservationDate.val().trim() || !reservationTime.val().trim()) {
    //   return;
    // }
    // Constructing a newReservation object to hand to the database
    var newReservation = {
      reservation_date: reservationDate.val().trim(),
      reservation_time: reservationTime.val().trim(),
      barber_name: barberSelect.val().trim(),
      customer_first_name: customerName.val().trim(),
      // customer_last_name:
      // customer_email:
      // customer_phone:
    };

    console.log(newReservation.reservation_date);

    // If we're updating a reservation run updateReservation to update a reservation
    // Otherwise run submitReservation to create a whole new reservation
    if (updating) {
      newReservation.id = reservationId;
      updateReservation(newReservation);
    } else {
      submitReservation(newReservation);
    }
  });

  // Submits a new reservation and brings user to makeReservation page upon completion
  function submitReservation(newReservation) {
    $.post("/api/reservations/", newReservation, function () {
      window.location.href = "/makeReservation";
    });
  }

  // Gets reservation data for a reservation if we're editing
  function getReservationData(id) {
    $.get("/api/reservations/" + id, function (data) {
      if (data) {
        // If this reservation exists, prefill our cms forms with its data
        reservationDate.val(data.reservation_date);
        reservationTime.val(data.reservation_time);
        barberSelect.val(data.barber_name);
        customerName.val(data.customer_first_name);
        // If we have a reservation with this id, set a flag for us to know to update the reservation
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given reservation, bring user to the makeReservation page when done
  function updateReservation(reservation) {
    $.ajax({
        method: "PUT",
        url: "/api/reservations",
        data: reservation
      })
      .then(function () {
        window.location.href = "/makeReservation";
      });
  }
});