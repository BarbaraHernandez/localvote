$(document).ready(function() {
  // event listener
  $("#voteForm").on("submit", function handleVote(event) {
    event.preventDefault();
    var voteVal = $("input:checked").val();
    var policyId = $("#voteForm").attr("data-id");

    //determine vote
    if (voteVal === "1") {
      var choice = 1;
      var newVote = {
        postId: policyId,
        choice: choice
      };
      submitVote(newVote);
    } else if (voteVal === "0") {
      var choice = 0;
      var newVote = {
        postId: policyId,
        choice: choice
      };
      submitVote(newVote);
    }
  });

  // submit vote
  function submitVote(newVote) {
    $.ajax({
      method: "POST",
      url: "/api/vote",
      data: newVote
    }).then(function(data) {
      location.reload();
    });
  }
});
