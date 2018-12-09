$(document).ready(function() {
  // AJAX search
  var timeout = null;
  $("#auto-complete").keyup(function() {
    console.log("Typing...");
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      $.ajax({
        method: "GET",
        url: "/api/search/" + $("#auto-complete").val()
      }).then(function(data) {
        console.log("response");
        console.log(data);
      });
    }, 500);
  });
});
