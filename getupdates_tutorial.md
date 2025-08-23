# getUpdates API 사용 튜토리얼

## 실제 사용 단계

### 1단계: Bot Token 준비
```
예시 토큰: 123456789:ABCdef1234567890ABCdef1234567890ABC
```

### 2단계: Bot과 대화
- Telegram에서 Bot 검색
- /start 명령어 전송
- 아무 메시지나 전송 (예: "안녕하세요")

### 3단계: 브라우저 주소창에 입력
```
https://api.telegram.org/bot123456789:ABCdef1234567890ABCdef1234567890ABC/getUpdates
```

### 4단계: 응답 확인
브라우저에서 다음과 같은 응답이 나타남:

```json
{
  "ok": true,
  "result": [
    {
      "update_id": 946208239,
      "message": {
        "message_id": 2,
        "from": {
          "id": 987654321,          ← Chat ID
          "is_bot": false,
          "first_name": "김철수",
          "language_code": "ko"
        },
        "chat": {
          "id": 987654321,          ← Chat ID (같은 값)
          "first_name": "김철수",
          "type": "private"
        },
        "date": 1703162400,
        "text": "안녕하세요"
      }
    }
  ]
}
```

### 5단계: Chat ID 복사
- **987654321** ← 이 숫자가 Chat ID
- 이 숫자를 n8n Telegram 노드에 입력

## 문제 해결

### "result": [] (빈 배열)
→ Bot과 대화하지 않았음. /start 먼저 전송

### "Unauthorized" 오류  
→ Bot Token이 잘못됨. BotFather에서 재확인

### 아무것도 안 보임
→ URL을 정확히 입력했는지 확인

## 그룹 채팅의 경우
그룹에서 사용하려면:
1. 그룹에 Bot 추가
2. 그룹에서 메시지 전송  
3. Chat ID는 음수로 표시됨 (예: -123456789)