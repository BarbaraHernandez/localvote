$(document).ready(function() {
  // AJAX search
  var timeout = null;
  $("#auto-complete").keyup(function() {
    console.log("Typing...");
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      var autoComplete = $("#auto-complete").val();
      if (autoComplete === "") {
        console.log("Most Recent");
        $("#search-results").empty();
        $("#most-recent").show();
      } else {
        console.log("Else");
        $.ajax({
          method: "GET",
          url: "/api/search/" + autoComplete
        }).then(function(data) {
          $("#search-results").empty();
          $("#most-recent").hide();
          console.log("Empty");
          for (var i = 0; i < data.length; i++) {
            $("#search-results").append('<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><a href="/policy/' + data[i].id + '">' + data[i].title + '</a></h3></div><div class="panel-body">' + data[i].policyDetail + '</div></div>');
          }
        });
      }
    }, 500);
  });
});
