let actionTuples = [
  ["click", "linkText=응답소"],
  ["click", "linkText=민원신청"],
  ["click", "linkText=작성하기"],
  ["click", "linkText=신청하기"],
  ["click", "id=CN"],
  ["type", "id=CN"],
  ["click", "id=tmp_submit"],
  ["assertAlert", "민원발생지역을 선택해 주세요."],
  ["click", "id=CVPL_OCCRRNC_AREA"],
  ["select", "id=CVPL_OCCRRNC_AREA"],
  ["click", "id=SJ"],
  ["type", "id=SJ"],
  ["click", "id=PERSON_INFO_YN"],
  ["chooseOkOnNextConfirmation", ""],
  ["click", "id=tmp_submit"],
];

const moveForward = function (feature, pointer) {
  feature = actionTuples; // 나중엔 피쳐 선택 가능해야함
  if (pointer === length(feature) - 1) {
    return alert("튜토리얼을 완료했습니다!");
  }
  pointer += 1;
  return generateShape(feature[pointer]);
};

function moveBackward(feature, pointer) {
  if (pointer === 0) {
    return alert("첫번째 과정입니다");
  }
  pointer -= 1;
  return generateShape(feature[pointer]);
}

function generateShape(actionTuple) {
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
      setInterval(addClassName, 500, el);
    }
  }
}

function addClassName(el) {
  console.log("add class name");
  el.classList.toggle("target-tag-red");
  el.classList.toggle("target-tag-blue");
}

// contentscript.js
chrome.runtime.onMessage.addListener(function (msg, sender) {
  if (msg.filter == "author") {
    alert("successsss");
  }
});
