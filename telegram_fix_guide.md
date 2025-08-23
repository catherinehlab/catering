# Telegram 노드 오류 해결 가이드

## 🚨 현재 오류
```
Problem in node 'Telegram Notification'
Bad request - please check your parameters
```

## 🔍 문제 원인
1. **Chat ID**: `REPLACE_WITH_ACTUAL_TELEGRAM_CHAT_ID` (placeholder)
2. **Credential**: `REPLACE_WITH_ACTUAL_TELEGRAM_CREDENTIAL_ID` (placeholder)
3. **Bot Token**: 미설정 상태

## 🛠️ 해결 방법

### Option 1: Telegram 노드 임시 비활성화 (즉시 해결)
워크플로우 테스트를 위해 Telegram 노드만 임시 제거:

1. **n8n 에디터**에서 Webhook 노드 선택
2. **연결 설정**에서 Telegram Notification 연결 제거
3. **저장** 및 **테스트 재시도**

### Option 2: 올바른 Telegram 설정 (완전 해결)

#### Step 1: Telegram Bot 생성
1. Telegram에서 `@BotFather`와 대화 시작
2. `/newbot` 명령어 실행
3. Bot 이름과 username 설정
4. **Bot Token** 복사 (예: `123456789:ABCdef1234567890ABCdef1234567890ABC`)

#### Step 2: Chat ID 확인
**개인 채팅 사용 시:**
```bash
# Bot과 대화 시작 후 실행
curl https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
```

**그룹 채팅 사용 시:**
1. Bot을 그룹에 추가
2. 그룹에서 메시지 발송
3. 위 명령어로 chat ID 확인 (음수 값)

#### Step 3: n8n에서 Credential 설정
1. **Settings** → **Credentials** → **Add Credential**
2. **Telegram** 선택
3. **Access Token**: Bot Token 입력
4. **저장**

#### Step 4: 워크플로우 업데이트
Telegram 노드에서:
- **Credentials**: 생성한 credential 선택
- **Chat ID**: 실제 chat ID 입력 (예: `123456789` 또는 `-987654321`)

## 🧪 임시 테스트용 워크플로우
Telegram 없이 테스트하려면 다음 JSON으로 업데이트:

```json
{
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "Save Lead to Google Drive",
            "type": "main", 
            "index": 0
          },
          {
            "node": "Google Sheet",
            "type": "main",
            "index": 0
          },
          {
            "node": "Email Reply",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

## ✅ 테스트 명령어
Telegram 노드 수정 후:
```bash
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{"name": "테스트", "company": "테스트회사", "email": "test@example.com"}' \
  'https://n8n.ax-con.com/webhook/catherineh-lab-b2b-lead'
```

## 📱 Telegram 메시지 예시
설정 완료 시 다음과 같은 메시지가 발송됩니다:
```
New B2B Lead from Catherine H Lab Landing Page:
Name: 김철수
Company: 테스트 컴퍼니
Email: test@example.com
Phone: 010-1234-5678
Event Date: 2024-09-15
Headcount: 50명
Budget: 300만원
Message: 회사 워크샵용 케이터링 서비스 문의드립니다.
Source: google / cpc
Page: landing-page
```

## 🔄 권장 순서
1. **즉시**: Telegram 노드 연결 해제 → 다른 노드들 테스트
2. **이후**: Telegram Bot 설정 → 완전한 워크플로우 테스트