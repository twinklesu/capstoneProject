$(function () {
  $("#start").on("click", function () {
    console.log("on click start");
    ping("start");
  });
  $("#pre").on("click", function () {
    console.log("on click pre");
    ping("pre");
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
  chrome.runtime.sendMessage({ action: msg }, (response) => {
    if (msg === "end") {
      alert("튜토리얼을 종료합니다!");
    }
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("get message in popup");
  alert(request.action);
});
