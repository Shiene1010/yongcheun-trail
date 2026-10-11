# yongcheun-trail — 동네 트레일 안내 모바일 MVP

동네 트레일(진천 농다리~초평호반 일대) 안내를 위한 모바일 웹 MVP. 환승·코스·보급 3탭으로 “뚜벅이 당일치기” 동선을 한 화면에 담았다. 모두의창업 제출작.

- Live: https://shiene1010.github.io/yongcheun-trail/
- 성격: 개인 프로젝트 (기획·제작·제출 전 과정, 수익모델 포함)
- 스택: 정적 HTML/CSS/JS, GitHub Pages, localStorage 상태 저장

## 나의 역할

- 기획·제작·제출 전 과정 1인 수행
- 환승 타임라인(지곡동→용인시청→백암→진천터미널) 스펙 정의
- 코스 탭 평지/하이킹 이원화 레이어 (`toggleHealthRoute` in `script.js:103`), 고도 프로필 목업 차트, 보급 탭 LNT 경고·마트/편의점 카드 구현
- 폰 프레임 고정 디자인 시스템 (`style.css:24-35`, 375×667)

## Lessons Learned

- 기술보다 “누가 왜 쓰나”가 먼저. `profit.png` 한 장(수익모델)이 기획서보다 설득력이 셈.
- 목업 데이터라도 상태 저장(`STORAGE_KEY` in `script.js:4`)을 넣으니 필드테스트에서 이어보기 가능해짐.
- 이미지·PDF를 `images/`·`pdfs/`에 무분별 적재 → 84MB 비대화. PF용 2~3장만 압축 유지가 정답.

## 추가자료

- Live URL: https://shiene1010.github.io/yongcheun-trail/
- 모두의창업 제출 기록: `pdfs/지원서_whatwillmyversebe.pdf`
- 기획 스크린샷: `images/ychtrailMvp_*.png` (경량, PF용)
- 초기안(사진 포함): `pdfs/용천트레일_초기안_사진포함.pdf`

## PF 메모 (5MB·5슬롯 대응)

- PF에는 본 MVP 라이브 URL + `ychtrailMvp_all.png` 1장 + `profit.png` 압축본 1장으로 충분.
- `sinario.png`·`solution.png`·`transfering.png` 원본 5MB급은 PF에 직접 첨부 금지, 압축 후 사용.
- `images/2026_map_*.pdf`는 위치 오류(이미지 폴더 내 PDF). 원본 보관용으로만 유지.
