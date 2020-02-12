## 대학교 기반 소개팅 PWA

> 본 Repository는 주로 private 상태로 개발합니다.
>
> 함께 개발하는 [Express API server repository](https://github.com/umi0410/meet-api)

![preview.png](preview.png)

https://app.umidev.be

## 기술

* React를 통한 PWA
* FCM을 통한 Push Notification
* Socket.io를 통한 채팅 구현
* serviceWorker을 이용한 Notification
* S3 정적호스팅과 CloudFront, Route53를 이용한 HTTPS 정적 웹 사이트



## 주의사항

.env, .env.production은 credentials s3 에 업로드해놓음.

github에서는 제외시킬 것.



어찌된 영문인지 얼마 전까지 잘 작동하던 도메인이 갑자기 작동하지 않네요.

Route53으로 한 2주 전에 등록했던 도메인인데 당황스럽습니다.

어떤 경우에 이런 현상이 발생할 수 있을까요?

평소에 콘솔창을 자세히 안 봐서 모르겠는데, 사진처럼 "등록된 도메인" 탭에 제 도메인이 뜨지 않으면 등록이 안 된 건가요? 여전히 호스팅 영역에는 등록했던 도메인 관련한 호스팅이 존재하는데, 갑자기 도메인이 제대로 작동하지 않아 당황스럽습니다... 1년치로 돈 냈는데...ㅜ.ㅜ.. 어떨 때 발생할 수 있는 현상인지 모르겠네요.

EC2 인스턴스를 새 인스턴스로 갈아치우다가 문제를 발견했는데, 도메인에 s3와 ec2 모두 연결해놨는데, 갑자기 둘 다 작동 안하는 걸 보아 EC2 의 문제는 아닌 것 같습니다.