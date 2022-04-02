let actionTuples = [
  ["click", "linkText=응답소"],
  // ["click", "linkText=민원신청"],
  // ["click", "linkText=작성하기"],
  // ["click", "linkText=신청하기"],
  // ["click", "id=CN"],
  // ["type", "id=CN"],
  // ["click", "id=tmp_submit"],
  // ["assertAlert", "민원발생지역을 선택해 주세요."],
  // ["click", "id=CVPL_OCCRRNC_AREA"],
  // ["select", "id=CVPL_OCCRRNC_AREA"],
  // ["click", "id=SJ"],
  // ["type", "id=SJ"],
  // ["click", "id=PERSON_INFO_YN"],
  // ["chooseOkOnNextConfirmation", ""],
  // ["click", "id=tmp_submit"],
];

const stepByStep = actionTuples.forEach(function (actionTuple) {
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
});

function addClassName(el) {
  console.log("add class name");
  el.classList.toggle("target-tag-red");
  el.classList.toggle("target-tag-blue");
}
