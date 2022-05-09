var tabId;
var actionTuple;
var pointer;
var featureName;
var feature;
var intervalId;
var preActionTuple;
var scrollPointer = 0;

// get message from popup when button clicked
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("(back) 선택된 기능: ", request.feature);
  getActionTuple(request.action, request.feature); //  request.feature "민원 신청 임시 저장"
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
        if (pointer === dictObject[featureName].length) {
          sendMsgToPopup("마지막 스텝입니다.\n튜토리얼을 종료합니다");
        } else {
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
    if (pointer < dictObject[featureName].length - 1) {
      if (actionTuple[0] === "runScript") {
        // scroll
        scrollPointer =
          actionTuple[1].split("(")[1].split(")")[0].split(",")[1] * 1000;
        pointer += 1;
        actionTuple = dictObject[featureName][pointer];
      }
    }

    console.log("actionTuple: " + actionTuple);
    console.log("last interval id: " + intervalId);

    chrome.storage.local.set({ pointer: pointer });

    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        func: tutorialMain,
        args: [actionTuple, intervalId, preActionTuple, scrollPointer],
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
function tutorialMain(actionTuple, intervalId, preActionTuple, scrollPointer) {
  console.log("(content) scrollPointer: " + scrollPointer);
  // css
  var styles = `
  .target-tag-red {
    outline: rgba(255, 0, 0, 0.7) solid 8px;
    border-radius: 30px;
  }  

  .scroll {
    font-size: 40px;
    position: fixed;
    top: 50%;
    left: 75%;
    background-color: rgba(255, 0, 0, 0.7);
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
          el = document.querySelector(tagIdentifier.split(" ")[0]);
          break;
      }
    }
    // pre tutorial remove
    if (el) {
      el.classList.remove("target-tag-red");
    }
    var scrollTag = document.getElementById("scroll");
    if (scrollTag) {
      document.body.removeChild(scrollTag);
    }

    // scroll
    if (scrollPointer !== 0) {
      console.log("(back) scroll");
      scroll = window.scrollY - scrollPointer;
      var div = document.createElement("div");
      div.setAttribute("id", "scroll");
      div.classList.add("scroll");
      if (scroll < 0) {
        // scroll down
        var arrowDown = document.createTextNode("⬇️⬇️⬇️");
        div.appendChild(arrowDown);
      } else if (scroll > 0) {
        // scroll up
        var arrowDown = document.createTextNode("⬆️⬆️⬆️");
        div.appendChild(arrowDown);
      }
      document.body.appendChild(div);
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
          el = document.querySelector(tagIdentifier.split(" ")[0]);
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
    ["runScript", "window.scrollTo(0,0.6666666865348816)"],
    ["click", "id=PERSON_INFO_YN"],
    ["click", "id=tmp_submit"],
  ],
  "청년 임차 보증금 신청": [
    ["click", "linkText=서울주거포털"],
    ["click", "css=.li03 .icon"],
    ["click", "linkText=임차보증금 이자지원사업 신규 신청하기 >"],
    ["click", "id=rd13"],
    ["click", "id=rd07"],
    ["click", "css=.options:nth-child(6) > .option:nth-child(2) > label"],
    ["click", "css=.options:nth-child(8) > .option:nth-child(1) > label"],
    ["click", "id=JS_01"],
    ["click", "linkText=다음단계(4/40)"],
    ["click", "id=appBirthdayYear"],
    ["click", "id=appBirthdayMonth"],
    ["click", "id=appBirthdayDay"],
    ["click", "id=appEmail1"],
    ["click", "id=appEmail2"],
    ["click", "id=appTelNo2"],
    ["click", "id=appTelNo3"],
    ["click", "id=privateKey1"],
    ["click", "id=privateKey2"],
    ["click", "id=duplicate"],
    ["selectFrame", "index=0"],
    ["sendKeys", "id=region_name"],
    ["click", "css=.over"],
    ["close", ""],
    ["click", "linkText=다음단계(4/40)"],
    ["click", "id=file1"],
    ["click", "id=file2"],
    ["click", "id=file3"],
    ["click", "id=file10"],
    ["click", "id=workDaycnt1U"],
    ["click", "id=file6Income"],
    ["click", "id=file6"],
    ["click", "id=file11"],
    ["click", "css=tr:nth-child(7) > td"],
    ["click", "css=tr:nth-child(7) > td"],
    ["click", "id=file12"],
    ["click", "id=mrrgN"],
    ["click", "id=file8Income"],
    ["click", "id=file8"],
    ["click", "id=file9Income"],
    ["click", "css=.parents:nth-child(14) > td"],
    ["click", "id=file9Income"],
    ["click", "css=.parents:nth-child(14) > td"],
    ["click", "id=file9Income"],
    ["click", "id=housingPayN"],
    ["click", "id=housingPayAgrY"],
    ["click", "linkText=다음단계(4/40)"],
    ["click", "id=file9PmarrIncome"],
    ["click", "id=file8Income"],
    ["click", "id=file6Income"],
    ["click", "linkText=다음단계(4/40)"],
    ["click", "id=file9"],
    ["click", "linkText=다음단계(4/40)"],
    ["click", "css=.scroll-a:nth-child(19) > .policy-agree"],
    ["click", "id=agreeyn1"],
    ["click", "id=agreeyn2"],
    ["click", "id=agreeyn3"],
    ["click", "id=agreeyn4"],
    ["click", "linkText=다음단계"],
  ],
  "평생 학습 수강 신청": [
    ["click", "css=.portal .ico_service"],
    ["click", "css=.icon_item:nth-child(4) > img"],
    ["click", "css=.btn_cate:nth-child(2)"],
    ["click", "css=.card_txt_box:nth-child(4) #custom_pdtName"],
    ["click", "id=request_regist"],
    ["click", "css=#confirm_box #course_add_btn > span"],
    ["click", "id=same_phone_no"],
    ["click", "id=refundName"],
    ["click", "id=bankName"],
    ["click", "id=accountNo"],
    ["click", "css=div:nth-child(11)"],
    ["click", "css=p:nth-child(12) > label"],
    ["click", "linkText=결제하기"],
    ["selectFrame", "index=1"],
    ["click", "id=inputAll"],
    ["click", "css=#cardCode21 > .img_crd"],
    ["click", "css=#cardCode21 > .img_crd"],
    ["click", "css=#cardCode21 > .img_crd"],
    ["doubleClick", "css=#cardCode21 > .img_crd"],
    ["click", "id=CardBtn"],
    ["selectFrame", "index=4"],
  ],
};
