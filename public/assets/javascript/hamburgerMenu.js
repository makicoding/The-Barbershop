console.log ("Menu JavaScript Connected!");

// The code below slides in the overlay navigation menu downwards from the top (0 to 100% height), when it is triggered:

// Open when someone clicks on the span element
function openNav() {
  document.getElementById("myNav").style.height = "100%";
}
  
// Close when someone clicks on the "x" symbol inside the overlay
function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}