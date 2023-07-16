# 🕸️ Webigator
This project is the 2022 ITM(Seoultech) Capstone project of [Subin Park](https://github.com/twinklesu) and [Hyeonyeong Seo](https://github.com/HyeonYeong-Rose). <br>
We were awarded the 2nd prize in the Capstone project competition!


### Abstract
Web services have become more essential in daily life, and the guidance to complete the web services would improve the user experience. In this study, to improve the user experience in web services, we devise a contextual tutorial system, which we call _Webigator_. First, we categorize the web navigation paths of the users into two types: 1) inter-page navigation and 2) within-page navigation. Based on these two types of navigation, we design _Webigator_, which overlays visual instructions on users' context. We aim to present a general-purpose tutorial so that it can be adjusted to any website without modifying the existing codes. Furthermore, we present a method to automatically generate the tutorials of _Webigator_ through demonstration-based event extraction. From our user study with 15 participants, we confirm that users can easily adjust to _Webigator_ and prefer _Webigator_ over the existing widely used tutorials (i.e., text and image tutorials) with an aspect of ease of use. We also observed that _Webigator_ is about 3.8 times and 3.1 times faster than text and image tutorials, respectively, while showing a higher level of accuracy. This indicates the effectiveness of the proposed _Webigator_ in improving the user experience of the existing tutorials.

### Links for more details 
- [Presentation video](https://www.youtube.com/watch?v=2t0I0-aU_uw&list=PLn_-l_ywBdxYqofQm8NRySeO62jvY9iOz)
- (International Journal) Webigator: Web Navigator Based on Context Tutorial for Improving the User Experience. **not published yet**
- (Domestic Journal) Overlay-Based Interactive Tutorial for Enhancing Web Site Usability.KIISE Transactions on Computing Practices. 2023 [link](https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11435171)
- (Domestic Conference) Interactive Tutorial for Websites of Public Institutions Using Chrome Extension.한국정보과학회 학술발표논문집. 2022 [link](https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11113696)
  - Best research presentation award [link](https://drive.google.com/file/d/1eAgyD7RWt_PW4YAiJkvaFCDZfWKitYpN/view)
  


## Follow the steps to install _Webigator_

1. Access `chrome://extensions` with your Chrome browser
2. Turn on **developer mode**

![](https://velog.velcdn.com/images/twinklesu914/post/c1e88adb-adbe-4004-bc3d-d106c89bff18/image.png)

3. Upload **Webigation folder** & turn it on

![](https://velog.velcdn.com/images/twinklesu914/post/5149f969-6d99-444c-b9ea-6a68599816f4/image.png)

4. Pin the extension

![](https://velog.velcdn.com/images/twinklesu914/post/2c3b6cc1-7b49-45ec-9407-8a187d99cc20/image.png)

5. Open the menu from the upper right, and move to **short cut key**

![](https://velog.velcdn.com/images/twinklesu914/post/f0680849-a28a-4665-8c68-bcafefb8534a/image.png)

6. Set keyboard shortcut by **typing shortcut** as image

![](https://velog.velcdn.com/images/twinklesu914/post/c39eae70-0691-4902-8a90-4ad9aa84620a/image.png)

7. Done!

![](https://velog.velcdn.com/images/twinklesu914/post/abcd7535-2cd9-4f19-9f22-e07a974ed877/image.png)

- Click the features that you need help with and start a tutorial. You can move forward and backward in the tutorial by using `ctrl+→` and `ctrl+←` or clicking buttons on the pop-up
- You should set your Chrome in Korean to use _Webigator_

---

### Minor Issues

- log in to the Seoul City Hall website is required in advance to use _Webigator_
- Each task ends before real completion since _Webigator_ is a demo application.
  - `민원 신청 임시 저장` tutorial doesn't submit any complaints. It guides you to store a complaint temporarily.
  - `청년 임차 보증금 신청` tutorial ends before clicking apply button for real.
  - `공공 시설 예약` tutorial helps to reserve the first facility. The available facility and reservation website are changed often. The data was collected in May 2022, and it might not work these days.
