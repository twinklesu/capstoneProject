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
    switch (featureName) {
      case "민원 신청 임시 저장": {
        select1.checked = true;
        console.log("(popup) 민원 신청 진행중");
        break;
      }
      case "청년 임차 보증금 신청": {
        select2.checked = true;
        console.log("(popup) 청년 임차 보증금 신청 진행중");
        break;
      }
      case "공공 시설 예약": {
        select3.checked = true;
        console.log("(popup) 공공 시설 예약 진행중");
        break;
      }
      default: {
        select1.checked = false;
        select2.checked = false;
        select3.checked = false;
      }
    }
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
    name = "공공 시설 예약";
  });

  // 기능 선택 없이 다른 버튼 누르면 예외 처리 필요
  $("#start").on("click", function () {
    // 시작 버튼 눌렸을 때
    console.log("on click start");
    // 여기서 feature 선택해서

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
  if (request.action !== "close popup") alert(request.action);
  window.close(); // 버튼 누를때 팝업 닫힘
});
