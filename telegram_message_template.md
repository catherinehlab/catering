# Telegram 메시지 템플릿

## 기본 메시지 템플릿
```
🍽️ 새로운 B2B 케이터링 문의

👤 고객정보:
• 이름: {{$json.name}}
• 회사: {{$json.company}}
• 이메일: {{$json.email}}
• 전화: {{$json.phone}}

📅 행사정보:
• 날짜: {{$json.eventDate}}
• 인원: {{$json.headcount}}
• 예산: {{$json.budget}}

💬 요청사항:
{{$json.message}}

📈 마케팅 정보:
• 출처: {{$json.utm_source}}
• 매체: {{$json.utm_medium}}
• 캠페인: {{$json.utm_campaign}}
• 페이지: {{$json.page}}

⏰ 접수시간: {{$json.timestamp}}
```

## 간단한 버전
```
🍽️ 새 문의: {{$json.name}} ({{$json.company}})
📞 {{$json.phone}} | 📧 {{$json.email}}
📅 {{$json.eventDate}} | 👥 {{$json.headcount}}
💰 {{$json.budget}}
```

## 상세 버전 (이모지 포함)
```
🔔 Catherine H Lab 케이터링 신규 문의

👤 **고객 정보**
• 성함: {{$json.name}}
• 회사: {{$json.company}}
• 연락처: {{$json.phone}}
• 이메일: {{$json.email}}

🎉 **행사 상세**
• 행사일: {{$json.eventDate}}
• 예상인원: {{$json.headcount}}
• 예산범위: {{$json.budget}}

📝 **요청 내용**
{{$json.message}}

📊 **유입 경로**
{{$json.utm_source}} → {{$json.utm_medium}} → {{$json.utm_campaign}}

⏰ **문의시각**: {{$json.timestamp}}

---
💼 빠른 대응을 위해 24시간 내 연락 예정입니다.
```