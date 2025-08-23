#!/bin/bash

# Test script for Catherine H Lab B2B Lead Workflow webhook
# Replace YOUR_N8N_WEBHOOK_URL with the actual webhook URL from n8n

echo "🚀 Catherine H Lab B2B Lead Workflow - Webhook Test"
echo "=================================================="

# Test data
TEST_DATA='{
  "name": "김철수",
  "company": "테스트 컴퍼니 주식회사",
  "email": "test@example.com",
  "phone": "010-1234-5678",
  "eventDate": "2024-09-15",
  "headcount": "50명",
  "budget": "300만원",
  "message": "회사 워크샵용 케이터링 서비스 문의드립니다. 한식, 양식 모두 가능하며, 알레르기 대응 가능한 메뉴로 부탁드립니다.",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "b2b-catering-test",
  "page": "landing-page",
  "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%S.%3NZ")'"
}'

echo "📝 Test data:"
echo "$TEST_DATA" | jq '.'

echo ""
echo "🌐 Webhook endpoint: catherineh-lab-b2b-lead"
echo "📍 Replace YOUR_N8N_WEBHOOK_URL below with actual n8n webhook URL"

# Example webhook URL format:
# https://your-n8n-instance.com/webhook/catherineh-lab-b2b-lead

echo ""
echo "🚨 To test with real n8n instance, run:"
echo "curl -X POST \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '$TEST_DATA' \\"
echo "  'YOUR_N8N_WEBHOOK_URL/catherineh-lab-b2b-lead'"

echo ""
echo "✅ Test preparation complete!"
echo "⚠️  Remember to replace placeholder credentials in n8n before testing"