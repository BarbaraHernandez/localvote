$(document).ready(function() {
  var url = window.location.search;
  var policyId = 00000;
  var voteVal;
  // var voterId = "000000";
  // var eligible = false;

  //get and set policy id
  if (url.indexOf("?policy=") !== -1) {
    policyId = url.split("=")[1];
    getPolicy(policyId);
  }

  //if logged in, mark as eligible
  //if (*conditional for logged in*) {
  //capture user id
  //voterId = user id;
  //eligible = true;
  //}

  //event listener
  $("#voteForm").on("submit", function handleVote(event) {
    event.preventDefault();

    voteVal = $("input:checked").val();

    console.log("Vote: " + voteVal);

    //get account info--not in use
    // $.ajax({
    //   method: "GET",
    //   url: "/api/account"
    // }).then(function(data) {
    //   console.log("then function");
    //   console.log(data);
    // });
    //validate for user has not voted --not in use
    // if ((eligible = true)) {
    //   verifyRecord(policyId, voterId);
    // } else {
    //   return err("Sorry, you are not eligible to vote.");
    // }

    //determine vote
    if (voteVal === "1") {
      var choice = 1;
      var newVote = {
        postId: policyId,
        // accountId: voterId,
        choice: choice
      };
      submitVote(newVote);
    } else if (voteVal === "0") {
      var newVote = {
        postId: policyId,
        // accountId: voterId,
        choice: choice
      };
      var choice = 0;
      submitVote(newVote);
    }
  });

  function submitVote(newVote) {
    $.post("/api/votes", newVote, function() {
      window.location.href = "/policies";
    });
  }
  // function verifyRecord(policyId, voterId) {
  //   $.get("/api/votes/" + policyId + "/" + voterId, function(err, data) {
  //     if (data) {
  //       return err("You have already voted on this policy.");
  //     }
  //     if (err) {
  //       console.log("No previous vote found");
  //       submitVote(newVote);
  //     }
  //   });
  // }
});
