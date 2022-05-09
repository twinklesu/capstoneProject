var featureName = "";
chrome.storage.local.get(["featureName"], function (result) {
  featureName = result.featureName;
});

$(function () {
  var name;
  if (featureName !== "") {
    name = featureName;
    console.log("(popup) 이전에 선택된 기능: ", featureName);
    // 안골라도 선택된걸로 보이게,,,,,
  }
  $("#select1").on("click", function () {
    console.log("on click select1");
    name = "민원 신청 임시 저장";
  });
  $("#select2").on("click", function () {
    console.log("on click select2");
    name = "청년 임차 보증금 신청";
  });
  $("#select3").on("click", function () {
    console.log("on click select3");
    name = "평생 학습 수강 신청";
  });

  // 기능 선택 없이 다른 버튼 누르면 예외 처리 필요
  $("#start").on("click", function () {
    // 시작 버튼 눌렸을 때
    console.log("on click start");
    console.log(name);
    ping("start", name); // 여기에 feature 넘겨주면 됨!
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
