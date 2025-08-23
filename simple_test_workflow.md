# 단계별 워크플로우 테스트 가이드

## 🚨 현재 상황
- Telegram 노드 제거: ✅ 완료
- 여전히 500 오류 발생: ❌ 다른 노드들의 credential 문제

## 🔧 단계별 해결 방법

### Step 1: Webhook만 테스트 (가장 기본)
**n8n 에디터에서:**
1. **모든 노드 연결 해제** (Google Drive, Sheets, Email 모두)
2. **Webhook 노드만 남기기**
3. **저장 후 테스트**

**예상 결과:** HTTP 200 응답, 실제 데이터 반환

### Step 2: 노드별 단계별 추가
성공하면 하나씩 추가:

#### 2-1: Google Drive 노드 추가
- Webhook → Google Drive만 연결
- **실제 Google Drive credential 설정 필요**
- **실제 Folder ID 필요**

#### 2-2: Google Sheets 노드 추가  
- Webhook → Google Drive + Google Sheets
- **실제 Google Sheets credential 설정 필요**
- **실제 Sheet ID 필요**

#### 2-3: Email 노드 추가
- 모든 노드 연결
- **실제 SMTP credential 설정 필요**

## 🧪 테스트 명령어

### Webhook만 테스트
```bash
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{"name": "테스트"}' \
  'https://n8n.ax-con.com/webhook/catherineh-lab-b2b-lead'
```

**기대 결과:**
```json
{
  "name": "테스트"
}
```
또는 HTTP 200 상태코드

## 🔍 Credential 설정이 필요한 서비스들

### Google Drive
1. **Google Cloud Console**에서 프로젝트 생성
2. **Drive API** 활성화
3. **OAuth 2.0 인증 정보** 생성
4. **n8n에서 Google Drive credential 설정**

### Google Sheets
1. **Google Cloud Console**에서 **Sheets API** 활성화
2. **서비스 계정** 또는 **OAuth** credential 생성
3. **n8n에서 Google Sheets credential 설정**

### SMTP (이메일)
1. **Gmail SMTP** (권장):
   - Host: `smtp.gmail.com`
   - Port: `587` (TLS) 또는 `465` (SSL)
   - 앱 비밀번호 생성 필요
2. **다른 이메일 서비스** SMTP 설정

## ⚡ 즉시 해결 방법
**가장 빠른 테스트를 위해:**
1. **모든 노드 연결 해제** → Webhook만 남기기
2. **테스트 실행** → 200 응답 확인
3. **성공 시** → 하나씩 노드 추가 및 credential 설정

## 📋 우선순위
1. **Webhook만 테스트** (credential 불필요)
2. **Webhook + 실제 credential 있는 서비스** 하나씩 추가
3. **전체 워크플로우** 완성