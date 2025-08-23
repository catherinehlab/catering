# Chat ID 설정 예시

## 1. Bot Token 예시
```
123456789:ABCdef1234567890ABCdef1234567890ABC
```

## 2. getUpdates URL 예시
```
https://api.telegram.org/bot123456789:ABCdef1234567890ABCdef1234567890ABC/getUpdates
```

## 3. 응답 예시
```json
{
  "ok": true,
  "result": [
    {
      "update_id": 946208239,
      "message": {
        "message_id": 2,
        "from": {
          "id": 1234567890,     ← Chat ID는 이 숫자
          "is_bot": false,
          "first_name": "홍길동",
          "language_code": "ko"
        },
        "chat": {
          "id": 1234567890,     ← 같은 Chat ID 
          "first_name": "홍길동",
          "type": "private"
        },
        "date": 1703123456,
        "text": "/start"
      }
    }
  ]
}
```

## 4. n8n 설정
```
Telegram 노드에서:
- Chat ID: 1234567890 (숫자만)
- Message: 테스트 메시지 {{$json.name}}
```

## 5. 그룹 채팅의 경우
그룹에서 사용하려면:
1. 그룹에 Bot 추가
2. 그룹에서 메시지 전송
3. Chat ID는 음수로 나타남 (예: -1234567890)

## 6. 문제 해결
- Bot이 응답하지 않으면 → /start 다시 실행
- Chat ID가 없으면 → Bot과 메시지 주고받기 먼저
- 음수 Chat ID → 그룹 채팅 (정상)