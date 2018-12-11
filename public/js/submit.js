$(document).ready(function() {
  var detailInput = $("#submitDescription");
  var titleInput = $("#submitTitle");
  // var topicInput = $("#selectTopic");
  var form = $("#newPolicy");

  // default value of topic
  // topicInput.val("General");

  //event listener
  $(form).on("submit", function handleSubmit(event) {
    event.preventDefault();
    if (!detailInput.val() || !titleInput.val()) {
      return;
    }
    var newPolicy = {
      title: titleInput.val().trim(),
      policyDetail: detailInput.val().trim(),
      // category: topicInput.val().trim()
    };
    submitPolicy(newPolicy);
  });

  // ajax call
  function submitPolicy(Policy) {
    $.post("/api/post", Policy, function() {
      window.location.href = "/policies";
    });
    detailInput.val("");
    titleInput.val("");
  }
});
