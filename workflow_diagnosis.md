# 워크플로우 오류 진단 가이드

## 🚨 현재 상태
- ✅ 워크플로우 활성화됨 (404 → 500 오류로 변경)
- ✅ Webhook 엔드포인트 등록됨
- ❌ 실행 중 오류 발생 (HTTP 500)
- ⚠️ Placeholder credentials 미설정

## 📊 테스트 결과
```
상태코드: 500
응답: {"message":"Error in workflow"}
응답시간: ~3-4초 (정상적으로 실행 시도함)
```

## 🔍 오류 원인 분석

### 1차 의심: Credential 설정 문제
워크플로우의 모든 노드에서 placeholder credentials 사용 중:

**문제가 있는 노드들:**
- `Google Drive`: `REPLACE_WITH_ACTUAL_DRIVE_CREDENTIAL_ID`
- `Google Sheets`: `REPLACE_WITH_ACTUAL_SHEETS_CREDENTIAL_ID`  
- `Telegram`: `REPLACE_WITH_ACTUAL_TELEGRAM_CREDENTIAL_ID`
- `Email (SMTP)`: `REPLACE_WITH_ACTUAL_SMTP_CREDENTIAL_ID`

### 2차 의심: 노드 설정 오류
- Google Drive folder ID: `1ABC123XYZ_REPLACE_WITH_ACTUAL_FOLDER_ID`
- Google Sheet ID: `1ABC123XYZ_REPLACE_WITH_ACTUAL_SHEET_ID`
- Telegram chat ID: `REPLACE_WITH_ACTUAL_TELEGRAM_CHAT_ID`

## 🛠️ 해결 단계

### 즉시 조치 (n8n 에디터에서)
1. **워크플로우 편집 모드 진입**
2. **각 노드별 credential 설정:**

#### Google Drive 노드
```json
"credentials": {
  "googleDriveOAuth2Api": {
    "id": "실제_구글_드라이브_크리덴셜_ID",
    "name": "Catherine H Lab Google Drive"
  }
}
```

#### Google Sheets 노드  
```json
"credentials": {
  "googleSheetsApi": {
    "id": "실제_구글_시트_크리덴셜_ID",
    "name": "Catherine H Lab Google Sheets"
  }
}
```

#### Telegram 노드
```json
"credentials": {
  "telegramApi": {
    "id": "실제_텔레그램_크리덴셜_ID", 
    "name": "Catherine H Lab Telegram"
  }
}
```

#### Email 노드
```json
"credentials": {
  "smtp": {
    "id": "실제_SMTP_크리덴셜_ID",
    "name": "Catherine H Lab SMTP"
  }
}
```

### 임시 해결책: 노드 비활성화 테스트
오류 노드를 하나씩 비활성화하여 원인 파악:

1. **Webhook만 테스트**: 다른 모든 노드 연결 해제
2. **Google Drive만 테스트**: Drive 노드만 연결
3. **단계별 활성화**: 성공하는 노드부터 하나씩 추가

## 🧪 디버깅 테스트 명령어

### Webhook 응답만 테스트
```bash
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{"name": "테스트"}' \
  'https://n8n.ax-con.com/webhook/catherineh-lab-b2b-lead'
```

### 상세 오류 정보 확인
n8n 에디터에서:
1. **Executions** 탭 확인
2. **실패한 실행** 클릭
3. **오류 로그** 상세 확인

## ✅ 성공 기준
```
상태코드: 200
응답: 실제 워크플로우 결과 (JSON 또는 성공 메시지)
```

## 📝 다음 단계
1. n8n 에디터에서 실행 로그 확인
2. 오류 발생 노드 식별
3. 해당 노드의 credential 설정
4. 단계별 테스트 재시도