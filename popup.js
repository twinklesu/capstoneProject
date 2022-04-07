$(function () {
  $("#start").on("click", function () {
    console.log("on click start");
    ping();
  });
  $("#pre").on("click", function () {
    console.log("on click pre");
  });
  $("#next").on("click", function () {
    console.log("on click next");
  });
  $("#end").on("click", function () {
    console.log("on click end");
  });
});

function ping() {
  chrome.runtime.sendMessage("ping", (response) => {});
}
