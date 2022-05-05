$(function () {
  $("#start").on("click", function () {
    // 시작 버튼 눌렸을 때
    console.log("on click start");
    // 여기다가 코드 짜면 될듯!
    ping("start", "피쳐이름"); // 시작 경우에만 feature 이름 설정해서 여기서만 넘겨주면 됨
  });
  $("#pre").on("click", function () {
    console.log("on click pre");
    ping("pre", "");
  });
  $("#next").on("click", function () {
    console.log("on click next");
    ping("next", "");
  });
  $("#end").on("click", function () {
    console.log("on click end");
    ping("end", "");
  });
});

// background.js 로 메세지 보내는 곳
// 여기서 눌린 버튼과 피쳐 이름 전달
function ping(msg, feature) {
  chrome.runtime.sendMessage({ action: msg, feature: feature }, (response) => {
    if (msg === "end") {
      alert("튜토리얼을 종료합니다!");
    }
  });
}

// background.js에서 메세지 받는 곳
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("get message in popup");
  alert(request.action);
});
