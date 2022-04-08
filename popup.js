$(function () {
  $("#start").on("click", function () {
    console.log("on click start");
    ping("start");
  });
  $("#pre").on("click", function () {
    console.log("on click pre");
    print("pre");
  });
  $("#next").on("click", function () {
    console.log("on click next");
    ping("next");
  });
  $("#end").on("click", function () {
    console.log("on click end");
    ping("end");
  });
});

function ping(msg) {
  chrome.runtime.sendMessage({ action: msg }, (response) => {});
}
