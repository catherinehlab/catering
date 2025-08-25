# 구글시트 설정 가이드 - 완전한 워크플로우

## 1. 구글시트 생성 및 설정

### 구글시트 생성
1. Google Sheets에서 새 스프레드시트 생성
2. 제목: "Catherine H Lab - B2B 케이터링 문의 로그"

### 헤더 설정 (A1:M1)
| A | B | C | D | E | F | G | H | I | J | K | L | M |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 이름 | 회사 | 이메일 | 연락처 | 행사일자 | 예상인원 | 예산 | 메시지 | UTM Source | UTM Medium | 페이지 | 접수시간 | 소스 |

## 2. 구글시트 ID 확인

구글시트 URL에서 ID 추출:
```
https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit#gid=0
```

## 3. n8n 워크플로우 설정

### 구글시트 노드 설정
- **Operation**: Append Row
- **Sheet ID**: 위에서 복사한 시트 ID
- **Range**: A:M
- **Values**: 아래 표현식 사용

```javascript
=[[$json.body.name, $json.body.company, $json.body.email, $json.body.phone, $json.body.eventDate, $json.body.headcount, $json.body.budget, $json.body.message, $json.body.utm_source, $json.body.utm_medium, $json.body.page, $json.body.timestamp, $json.body.source]]
```

### 인증 설정
- **Credential Type**: Google Sheets OAuth2 API
- **Credential Name**: "Catherine H Lab Google Sheets"

## 4. 완전한 워크플로우 기능

### 📧 내부 이메일 알림
- **받는 사람**: catherinehlab@gmail.com
- **제목**: [신규 문의] 캐서린에이치랩 B2B 케이터링 문의
- **내용**: 모든 문의 데이터 포함

### 📧 고객 자동 회신
- **받는 사람**: 문의자 이메일
- **제목**: 캐서린에이치랩 케이터링 문의 접수 확인
- **내용**: 접수 확인 및 24시간 내 연락 안내

### 📱 텔레그램 알림
- **Chat ID**: 1971680823
- **내용**: 이모지와 함께 정리된 문의 정보

### 📊 구글시트 로깅
- **기능**: 모든 문의 데이터를 스프레드시트에 자동 저장
- **용도**: 문의 이력 관리, 분석, 보고서 생성

## 5. 데이터 구조

워크플로우에서 처리하는 데이터:
```json
{
  "body": {
    "name": "홍길동",
    "company": "테스트 회사",
    "email": "test@example.com",
    "phone": "010-1234-5678",
    "eventDate": "2024-09-15",
    "headcount": "50",
    "budget": "300",
    "message": "요청사항 내용",
    "utm_source": "direct",
    "utm_medium": "organic",
    "page": "https://catherineh-lab.com",
    "timestamp": "2024-08-25T07:19:51.674Z",
    "source": "catherineh-lab-b2b-landing"
  }
}
```

## 6. 설정 완료 체크리스트

- [ ] 구글시트 생성 및 헤더 설정
- [ ] 시트 ID n8n 워크플로우에 입력
- [ ] Google Sheets OAuth2 인증 설정
- [ ] SMTP 인증 설정 (Catherine H Lab SMTP)
- [ ] Telegram API 인증 설정
- [ ] 워크플로우 활성화
- [ ] 테스트 실행 및 검증

## 7. 문제 해결

### 구글시트 연결 오류
- OAuth2 인증 재설정
- 시트 공유 권한 확인
- API 활성화 상태 확인

### 이메일 발송 오류
- SMTP 설정 확인
- 이메일 주소 유효성 검증
- 발송 제한 확인

### 텔레그램 오류
- Bot Token 확인
- Chat ID 정확성 검증
- API 권한 확인