# Gmail SMTP 오류 해결 가이드

## 🚨 현재 오류
```
Problem in node 'Email Reply'
Invalid login: 534-5.7.9 Application-specific password required
```

## 🔍 문제 원인
Gmail 계정에서 **2단계 인증**이 활성화되어 있어서 일반 비밀번호로는 SMTP 접근이 불가능합니다.

## 🛠️ 해결 방법

### Option 1: Gmail 앱 비밀번호 생성 (권장)

#### Step 1: 2단계 인증 확인
1. **Google 계정 설정** (https://myaccount.google.com) 접속
2. **보안** 탭 선택
3. **2단계 인증** 활성화 상태 확인

#### Step 2: 앱 비밀번호 생성
1. **Google 계정 설정** → **보안**
2. **앱 비밀번호** 클릭 (2단계 인증이 활성화된 경우만 표시)
3. **앱 선택**: "메일"
4. **기기 선택**: "기타 (맞춤 이름)" → "n8n Catherine H Lab" 입력
5. **생성된 16자리 비밀번호** 복사 (예: `abcd efgh ijkl mnop`)

#### Step 3: n8n SMTP 설정 업데이트
**n8n 에디터에서:**
1. **Email Reply 노드** 선택
2. **Credentials** 설정
3. **SMTP 설정:**
   ```
   Host: smtp.gmail.com
   Port: 587
   Security: TLS
   Username: your-email@gmail.com
   Password: [생성된 16자리 앱 비밀번호]
   ```

### Option 2: 다른 이메일 서비스 사용

#### SendGrid (무료 티어)
```
Host: smtp.sendgrid.net
Port: 587
Security: TLS
Username: apikey
Password: [SendGrid API Key]
```

#### Mailgun (무료 티어)
```
Host: smtp.mailgun.org
Port: 587
Security: TLS
Username: postmaster@your-domain.mailgun.org
Password: [Mailgun Password]
```

#### 회사 이메일 SMTP
```
Host: [회사 SMTP 서버]
Port: 587 또는 465
Security: TLS 또는 SSL
Username: [회사 이메일]
Password: [회사 이메일 비밀번호]
```

### Option 3: Email 노드 임시 비활성화 (즉시 테스트용)

**n8n 에디터에서:**
1. **Webhook 노드** 선택
2. **Email Reply 노드 연결 해제**
3. **저장**

## 🧪 테스트 명령어

### Email 노드 제거 후 테스트
```bash
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "김철수",
    "company": "테스트 컴퍼니",
    "email": "test@example.com",
    "phone": "010-1234-5678"
  }' \
  'https://n8n.ax-con.com/webhook/catherineh-lab-b2b-lead'
```

## ⚡ 즉시 해결 순서

### 1단계: Email 노드 해제 (즉시)
- Email Reply 연결 해제
- Google Drive, Sheets만 연결
- 테스트 실행

### 2단계: Gmail 앱 비밀번호 설정 (이후)
- 앱 비밀번호 생성
- n8n SMTP credential 업데이트
- Email 노드 재연결

## 📧 Gmail 앱 비밀번호 예시
```
생성된 비밀번호: abcd efgh ijkl mnop
실제 입력: abcdefghijklmnop (공백 제거)
```

## ✅ 성공 시 동작
Gmail 설정 완료 후:
- 고객에게 한국어 확인 이메일 발송
- "캐서린에이치랩 케이터링 문의 접수 확인" 제목
- 24시간 내 연락 안내 메시지

## 🔒 보안 참고사항
- 앱 비밀번호는 일반 비밀번호와 별도 관리
- 필요 시 언제든 취소/재생성 가능
- 2단계 인증은 계속 활성화 상태 유지