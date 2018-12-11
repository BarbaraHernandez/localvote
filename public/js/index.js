/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
$(document).ready(function() {
  // AJAX search
  var timeout = null;
  $("#auto-complete").keyup(function() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      var autoComplete = $("#auto-complete").val();
      if (autoComplete === "") {
        $("#search-results").empty();
        $("#most-recent").show();
      } else {
        $.ajax({
          method: "GET",
          url: "/api/search/" + autoComplete
        }).then(function(data) {
          $("#search-results").empty();
          $("#most-recent").hide();
          for (var i = 0; i < data.length; i++) {
            $("#search-results").append('<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><a href="/policy/' + data[i].id + '">' + data[i].title + '</a></h3></div><div class="panel-body">' + data[i].policyDetail + '</div></div>');
          }
        });
      }
    }, 500);
  });
});
