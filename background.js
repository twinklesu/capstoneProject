var tabId;
var actionTuple;
var pointer;
var featureName;
var feature;
var intervalId;
var preActionTuple;

// get message from popup when button clicked
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("get message in background");
  getActionTuple(request.action);
});

function getActionTuple(action) {
  
  getStorage(); // get storage stored data
  setTimeout(function () {

    switch (action) {
      case "민원 신청": {
        console.log("민원 실행");
        feature = "민원 신청 임시 저장";
        break;
      }
      case "청년 임차 보증금 신청": {
        console.log("청년 실행");
        feature = "청년 임차 보증금 신청";
        break;
      }
      case "평생 학습 수강 신청": {
        console.log("평생 실행");
        feature = "평생 학습 수강 신청";
        break;
      }

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
          console.log("첫번째 튜토리얼");
        } else {
          pointer -= 1;
          chrome.storage.local.set({ pointer: pointer });
        }
        break;
      }
      case "next": {
        // 다음
        // 스토리지 포인터 +1 해서 갱신
        if (pointer === dictObject[featureName].length) {
          console.log("튜토리얼 완료");
        } else {
          pointer += 1;
          chrome.storage.local.set({ pointer: pointer });
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
    console.log("actionTuple: " + actionTuple);
    console.log("last interval id: " + intervalId);

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
function tutorialMain(actionTuple, intervalId, preActionTuple) {
  console.log("in content script");
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
    if (action === "click") {
      console.log(target);
      const tagType = target.split("=")[0];
      const tagIdentifier = target.split("=")[1];
      switch (tagType) {
        case "linkText":
          // find <a> tag with text
          xpath = "//a[text()='" + tagIdentifier + "']";
          var el = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue;
          break;
        case "id":
          // find element by id
          var el = document.getElementById(tagIdentifier);
          break;
      }
    }
    if (el) {
      el.classList.remove("target-tag-red");
    }
  }
  var newIntervalId = generateShape(actionTuple);
  chrome.storage.local.set({ intervalId: String(newIntervalId) });
  console.log("storing interval id: " + String(newIntervalId));

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
      switch (tagType) {
        case "linkText":
          // find <a> tag with text
          xpath = "//a[text()='" + tagIdentifier + "']";
          var el = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue;
          break;
        case "id":
          // find element by id
          var el = document.getElementById(tagIdentifier);
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

// get tab id on load
chrome.tabs.onUpdated.addListener(async () => {
  console.log(await getCurrentTab());
})

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
    ["click", "id=CN"],
    ["click", "id=CVPL_OCCRRNC_AREA"],
    ["click", "id=SJ"],
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
    ["select", "id=appBirthdayYear"],
    ["click", "id=appBirthdayYear"],
    ["select", "id=appBirthdayYear"],
    ["click", "id=appBirthdayMonth"],
    ["select", "id=appBirthdayMonth"],
    ["click", "id=appBirthdayDay"],
    ["select", "id=appBirthdayDay"],
    ["click", "id=appEmail1"],
    ["type", "id=appEmail1"],
    ["click", "id=appEmail2"],
    ["select", "id=appEmail2"],
    ["click", "id=appTelNo2"],
    ["type", "id=appTelNo2"],
    ["click", "id=appTelNo3"],
    ["type", "id=appTelNo3"],
    ["click", "id=privateKey1"],
    ["type", "id=privateKey1"],
    ["click", "id=privateKey2"],
    ["type", "id=privateKey2"],
    ["click", "id=duplicate"],
    ["selectFrame", "index=0"],
    ["type", "id=region_name"],
    ["sendKeys", "id=region_name"],
    ["click", "css=.over"],
    ["close", ""],
    ["type", "id=appAddrDtl"],
    ["click", "linkText=다음단계(4/40)"],
    ["click", "id=file1"],
    ["type", "id=file1"],
    ["click", "id=file2"],
    ["type", "id=file2"],
    ["click", "id=file3"],
    ["type", "id=file3"],
    ["click", "id=file10"],
    ["type", "id=file10"],
    ["click", "id=workDaycnt1U"],
    ["click", "id=file6Income"],
    ["type", "id=file6Income"],
    ["click", "id=file6"],
    ["type", "id=file6"],
    ["click", "id=file11"],
    ["type", "id=file11"],
    ["click", "css=tr:nth-child(7) > td"],
    ["click", "css=tr:nth-child(7) > td"],
    ["click", "id=file12"],
    ["type", "id=file12"],
    ["click", "id=mrrgN"],
    ["click", "id=file8Income"],
    ["type", "id=file8Income"],
    ["click", "id=file8"],
    ["type", "id=file8"],
    ["click", "id=file9Income"],
    ["type", "id=file9Income"],
    ["click", "css=.parents:nth-child(14) > td"],
    ["click", "id=file9Income"],
    ["type", "id=file9Income"],
    ["click", "css=.parents:nth-child(14) > td"],
    ["click", "id=file9Income"],
    ["type", "id=file9Income"],
    ["click", "id=housingPayN"],
    ["click", "id=housingPayAgrY"],
    ["click", "linkText=다음단계(4/40)"],
    ["click", "id=file9PmarrIncome"],
    ["click", "id=file8Income"],
    ["type", "id=file8Income"],
    ["click", "id=file6Income"],
    ["type", "id=file6Income"],
    ["click", "linkText=다음단계(4/40)"],
    ["click", "id=file9"],
    ["type", "id=file9"],
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
    ["mouseOver", "css=.portal .ico_service"],
    ["mouseOut", "css=.portal .ico_service"],
    ["click", "css=.icon_item:nth-child(5) > img"],
    ["click", "css=.btn_cate:nth-child(2)"],
    ["click", "css=.card_txt_box:nth-child(4) #custom_pdtName"],
    ["click", "id=request_regist"],
    ["click", "css=#confirm_box #course_add_btn > span"],
    ["click", "id=same_phone_no"],
    ["click", "id=refundName"],
    ["type", "id=refundName"],
    ["click", "id=bankName"],
    ["type", "id=bankName"],
    ["click", "id=accountNo"],
    ["type", "id=accountNo"],
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
