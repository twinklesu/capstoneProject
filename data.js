var dictObject = {
  "민원 신청 임시 저장": [
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

export { dictObject };