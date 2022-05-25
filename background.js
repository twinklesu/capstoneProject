var tabId;
var actionTuple;
var pointer;
var featureName;
var feature;
var intervalId;
var preActionTuple;

// get message from popup when button clicked
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("(back) 선택된 기능: ", request.feature); //여기에 피쳐네임 출력되면 전달된 것.
  getActionTuple(request.action, request.feature); //  request.feature "민원 신청 임시 저장"
});

// 단축키
chrome.commands.onCommand.addListener((command) => {
  if (command === "pre") {
    console.log("keyboard short cut pre");
    getActionTuple("pre", featureName);
  }
  if (command === "next") {
    console.log("keyboard short cut next");
    getActionTuple("next", featureName);
  }
});

function getActionTuple(action, feature) {
  getStorage(); // get storage stored data
  setTimeout(function () {
    switch (action) {
      case "start": {
        // start
        // 스토리지에 포인터 0 으로 저장
        // 선택한 피쳐 이름 스토리지에 저장
        console.log("in start case");
        featureName = feature;
        pointer = 0;
        chrome.storage.local.set({ featureName: featureName });
        chrome.storage.local.set({ pointer: 0 });
        break;
      }

      case "pre": {
        // 이전
        // 스토리지 포인터 -1 해서 갱신
        console.log("in pre case");
        if (pointer === 0) {
          // alert 띄우기
          sendMsgToPopup("첫번째 스텝입니다!");
          return;
        } else {
          pointer -= 1;
        }
        break;
      }
      case "next": {
        // 다음
        // 스토리지 포인터 +1 해서 갱신
        if (pointer + 1 === dictObject[featureName].length) {
          // 마지막
          preActionTuple = dictObject[featureName][pointer];
          chrome.scripting.executeScript(
            {
              target: { tabId: tabId },
              func: clearTutorial,
              args: [intervalId, preActionTuple],
            },
            () => {}
          );
          // sendMsgToPopup("마지막 스텝입니다.\n튜토리얼을 종료합니다");
          chrome.notifications.create("end", {
            type: "basic",
            iconUrl: "myself.png",
            title: "Webigation",
            message: "마지막 스텝입니다. \n튜토리얼을 종료합니다.",
            priority: 2,
            // buttons: [{ title: "okay" }],
          });
          chrome.storage.local.clear();
          return;
        } else {
          // 그냥 다음
          pointer += 1;
        }
        break;
      }
      case "end": {
        // 끝
        // 끝내깅
        chrome.storage.local.clear();
        return;
      }
      default: {
        // 예외 발생
        console.log("unknown request action clicked: " + request.action);
      }
    }
    actionTuple = dictObject[featureName][pointer];
    if (pointer > 0) {
      preActionTuple = dictObject[featureName][pointer - 1];
    } else {
      preActionTuple = null;
    }
    chrome.storage.local.set({ pointer: pointer });
    sendMsgToPopup("close popup");

    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        func: tutorialMain,
        args: [actionTuple, intervalId, preActionTuple],
      },
      () => {}
    );
  }, 500);
}

function getStorage() {
  chrome.storage.local.get(["featureName"], function (result) {
    featureName = result.featureName;
  });
  chrome.storage.local.get(["pointer"], function (result) {
    pointer = result.pointer;
  });
  chrome.storage.local.get(["intervalId"], function (result) {
    console.log("(getStorage) interval id from storage: " + result.intervalId);
    if (result.intervalId) {
      intervalId = result.intervalId;
    } else {
      intervalId = null;
    }
  });
}

// content script
function clearTutorial(intervalId, preActionTuple) {
  console.log("(content) clear tutorial: " + preActionTuple);
  // // css
  // var styles = `
  //   .target-tag-red {
  //     outline: rgba(255, 0, 0, 0.7) solid 8px;
  //     border-radius: 30px;
  //   }

  //   `;
  // var styleSheet = document.createElement("style");
  // styleSheet.innerText = styles;
  // document.head.appendChild(styleSheet);

  if (
    intervalId !== null &&
    intervalId !== undefined &&
    preActionTuple !== null
  ) {
    clearInterval(intervalId);
    const action = preActionTuple[0];
    const target = preActionTuple[1];

    // find element
    if (action === "click") {
      console.log(target);
      const tagType = target.split("=")[0];
      const tagIdentifier = target.split("=")[1];
      var el;
      switch (tagType) {
        case "linkText":
          // find <a> tag with text
          xpath = "//a[text()='" + tagIdentifier + "']";
          el = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue;
          break;
        case "id":
          // find element by id
          el = document.getElementById(tagIdentifier);
          break;
        case "css":
          el = document.querySelector(tagIdentifier);
          break;
        case "xpath":
          el = document.evaluate(
            tagIdentifier,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue;
          break;
      }
    }
    // pre tutorial remove
    if (el) {
      el.classList.remove("target-tag-red");
    }
  }
}

function tutorialMain(actionTuple, intervalId, preActionTuple) {
  // css
  var styles = `
  .target-tag-red {
    outline: rgba(255, 0, 0, 0.7) solid 8px;
    border-radius: 30px;
  }  

  `;
  var styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  console.log("interval to clear: " + intervalId);
  if (
    intervalId !== null &&
    intervalId !== undefined &&
    preActionTuple !== null
  ) {
    clearInterval(intervalId);
    const action = preActionTuple[0];
    const target = preActionTuple[1];

    // find element
    if (action === "click") {
      console.log(target);
      const tagType = target.split("=")[0];
      const tagIdentifier = target.split("=")[1];
      var el;
      switch (tagType) {
        case "linkText":
          // find <a> tag with text
          xpath = "//a[text()='" + tagIdentifier + "']";
          el = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue;
          break;
        case "id":
          // find element by id
          el = document.getElementById(tagIdentifier);
          break;
        case "css":
          el = document.querySelector(tagIdentifier);
          break;
        case "xpath":
          el = document.evaluate(
            tagIdentifier,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue;
          break;
      }
    }
    // pre tutorial remove
    if (el) {
      el.classList.remove("target-tag-red");
    }
  }
  var newIntervalId = generateShape(actionTuple);
  chrome.storage.local.set({ intervalId: String(newIntervalId) });

  // function description
  function addClassName(el) {
    el.classList.toggle("target-tag-red");
  }

  function generateShape(actionTuple) {
    var newIntervalId;
    const action = actionTuple[0];
    const target = actionTuple[1];
    if (action === "click") {
      console.log(target);
      const tagType = target.split("=")[0];
      const tagIdentifier = target.split("=")[1];
      var el;
      switch (tagType) {
        case "linkText":
          // find <a> tag with text
          xpath = "//a[text()='" + tagIdentifier + "']";
          el = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue;
          break;
        case "id":
          // find element by id
          el = document.getElementById(tagIdentifier);
          break;
        case "css":
          el = document.querySelector(tagIdentifier);
          break;
        case "xpath":
          el = document.evaluate(
            tagIdentifier,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue;
          break;
      }
      if (el !== null) {
        el.className += "target-tag-red";
        newIntervalId = setInterval(addClassName, 500, el);
      }
    }
    return newIntervalId;
  }
}

// send msg to popup
function sendMsgToPopup(msg) {
  chrome.runtime.sendMessage({ action: msg }, (response) => {
    console.log("(msg) back to popup: " + msg);
  });
}

// get tab id on load
chrome.tabs.onUpdated.addListener(async () => {
  console.log(await getCurrentTab());
});

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  tabId = tab.id;
  console.log(tabId);
}

// data
var dictObject = {
  "민원 신청 임시 저장": [
    ["click", "linkText=응답소"],
    ["click", "linkText=민원신청"],
    ["click", "linkText=작성하기"],
    ["click", "linkText=신청하기"],
    ["click", "id=CVPL_OCCRRNC_AREA"],
    ["click", "id=SJ"],
    ["click", "id=CN"],
    ["click", "id=MYOUNGYAMINWON_N"],
    ["click", "id=OPEN_AGRE_N"],
    ["click", "id=SAFERPRT_N"],
    ["click", "id=AFTER_RESULT_N"],
    ["click", "id=PROPSE_CHG_AGRE_N"],
    ["click", "id=PERSON_INFO_YN"],
    ["click", "id=tmp_submit"],
  ],
  "청년 임차 보증금 신청": [
    ["click", "css=.house"],
    ["click", "css=li:nth-child(1) .info-name"],
    ["click", "linkText=임차보증금 이자지원사업 신규 신청하기 >"],
    ["click", "id=rd13"],
    ["click", "id=rd07"],
    ["click", "id=rd10"],
    ["click", "id=rd11"],
    ["click", "id=JS_01"],
  ],
  "공공 시설 예약": [
    ["click", "linkText=평생학습포털"],
    ["click", "css=.icon_item:nth-child(4) > img"],
    ["click", "id=allMenu"],
    ["click", "css=.mylist:nth-child(4) li:nth-child(4) > a"],
    ["click", "css=.btn_cate:nth-child(1)"],
    ["click", "css=.cardView_box:nth-child(1) .mi_title"],
    ["click", "linkText=예약신청"],
    ["click", "css=#cal_20220531 > .date"],
    ["click", "linkText=예약하기"],
  ],
};
