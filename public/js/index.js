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

  //display for home page
  function getLastPolicy() {
    $.get("/api/posts/latest", function(data) {
      console.log("policy: " + JSON.stringify(data));
      displayPolicy(data);
    });
  }
  getLastPolicy();

  function displayPolicy(data) {
    console.log("title: " + JSON.stringify(data.policy.title));
    $("#policy-title").text(data.title);
    $("#policy-text").text(data.policyDetail);
  }
});
