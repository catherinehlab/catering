# n8n 워크플로우 활성화 가이드

## 🚨 현재 상태
- ❌ 워크플로우 비활성화됨
- ❌ Webhook 미등록 (404 오류)
- ✅ 워크플로우 구조 정상
- ✅ 테스트 데이터 준비 완료

## 🔧 활성화 단계

### 1. n8n 에디터에서 워크플로우 활성화
1. https://n8n.ax-con.com/workflow/ndU16DMEAaQkfVzC 접속
2. 우측 상단의 **"비활성화됨"** 토글을 **"활성화됨"**으로 변경
3. 저장 확인

### 2. Webhook URL 확인
활성화 후 webhook URL이 다음 형태로 등록됩니다:
```
https://n8n.ax-con.com/webhook/catherineh-lab-b2b-lead
```

### 3. Credential 설정 (필수)
워크플로우 실행을 위해 다음 credentials 설정 필요:

#### Google Drive 설정
- `REPLACE_WITH_ACTUAL_DRIVE_CREDENTIAL_ID` → Google Drive OAuth2 credential
- `1ABC123XYZ_REPLACE_WITH_ACTUAL_FOLDER_ID` → 실제 Google Drive 폴더 ID

#### Google Sheets 설정  
- `REPLACE_WITH_ACTUAL_SHEETS_CREDENTIAL_ID` → Google Sheets API credential
- `1ABC123XYZ_REPLACE_WITH_ACTUAL_SHEET_ID` → 실제 Google Sheets ID

#### Telegram 설정
- `REPLACE_WITH_ACTUAL_TELEGRAM_CREDENTIAL_ID` → Telegram bot credential
- `REPLACE_WITH_ACTUAL_TELEGRAM_CHAT_ID` → Telegram chat ID

#### SMTP 설정
- `REPLACE_WITH_ACTUAL_SMTP_CREDENTIAL_ID` → SMTP credential (이메일 발송용)

## 🧪 테스트 명령어

### 워크플로우 활성화 후 실행:
```bash
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "김철수",
    "company": "테스트 컴퍼니 주식회사",
    "email": "test@example.com",
    "phone": "010-1234-5678",
    "eventDate": "2024-09-15",
    "headcount": "50명",
    "budget": "300만원",
    "message": "회사 워크샵용 케이터링 서비스 문의드립니다.",
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "b2b-catering-test",
    "page": "landing-page",
    "timestamp": "2024-08-23T08:03:34.440Z"
  }' \
  'https://n8n.ax-con.com/webhook/catherineh-lab-b2b-lead'
```

## ✅ 성공 시 예상 동작
1. **Google Drive**: JSON 파일 저장
2. **Google Sheets**: 새 행 추가
3. **Telegram**: 관리자에게 알림 발송  
4. **Email**: 고객에게 확인 이메일 발송

## 🔍 디버깅
- n8n 실행 목록에서 workflow 실행 로그 확인
- 각 노드별 오류 메시지 점검
- Credential 연결 상태 확인

## 📝 다음 단계
1. 워크플로우 활성화
2. Credential 설정
3. 테스트 실행
4. 결과 확인 및 디버깅