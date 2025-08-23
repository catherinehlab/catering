# Catherine H Lab B2B Catering Project - Complete Documentation

## 📋 Project Overview

**Project Name**: Catherine H Lab B2B Catering Landing Page with n8n Workflow Automation  
**Purpose**: Automated lead processing system for B2B catering inquiries  
**Status**: ✅ Completed and Deployed  
**Production URL**: https://catherineh-lab-catering.vercel.app  
**GitHub Repository**: https://github.com/catherinehlab/catering.git  

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js, React, TypeScript
- **Automation**: n8n workflow platform
- **Deployment**: Vercel (automatic deployment from GitHub)
- **Version Control**: GitHub
- **Notifications**: Telegram Bot + Gmail SMTP
- **Data Storage**: Google Drive + Google Sheets

### System Flow
```
Landing Page Form → n8n Webhook → Parallel Processing:
├── Google Drive (JSON file storage)
├── Google Sheets (data entry)
├── Telegram Notification (admin alert)
└── Email Reply (customer confirmation)
```

## 🔧 n8n Workflow Configuration

### Workflow Structure
1. **Webhook Node**: Entry point for form submissions
   - Endpoint: `catherineh-lab-b2b-lead`
   - Method: POST
   - Authentication: None (public endpoint)

2. **Google Drive Node**: File storage
   - Operation: Upload file
   - Folder ID: Configurable
   - File format: JSON

3. **Google Sheets Node**: Data logging
   - Operation: Append row
   - Sheet ID: Configurable
   - Columns: name, company, email, phone, eventDate, headcount, budget, message, utm_source, utm_medium, utm_campaign, page, timestamp

4. **Telegram Node**: Admin notification
   - Bot Token: Required
   - Chat ID: Required
   - Message format: Structured lead information

5. **Email Node**: Customer confirmation
   - SMTP Host: smtp.gmail.com
   - Port: 587
   - Authentication: App password required
   - Template: Korean language confirmation email

### Critical Configuration Points
- **Gmail SMTP**: Must use app passwords, not regular passwords
- **Telegram Bot**: Requires active conversation with /start command
- **Chat ID**: Numeric format, obtainable via getUpdates API
- **Credentials**: All placeholder values must be replaced with actual credentials

## 📁 Project File Structure

```
catering/
├── n8n_workflow.json                 # Main workflow configuration
├── n8n_workflow_without_telegram.json # Backup without Telegram
├── test_workflow.js                  # Workflow simulation script
├── test_webhook.sh                   # Webhook testing script
├── vercel.json                       # Vercel deployment config
├── package.json                      # Node.js dependencies
├── next.config.js                    # Next.js configuration
├── pages/                           # Next.js pages
├── components/                      # React components
├── public/                          # Static assets
└── docs/                           # Documentation files
    ├── gmail_smtp_fix_guide.md      # Gmail setup guide
    ├── telegram_fix_guide.md        # Telegram bot setup
    ├── chatid_setup_example.md      # Chat ID configuration
    ├── getupdates_tutorial.md       # Telegram API tutorial
    ├── workflow_activation_guide.md # n8n activation steps
    └── workflow_diagnosis.md        # Troubleshooting guide
```

## 🚀 Deployment Setup

### GitHub Integration
- **Repository**: https://github.com/catherinehlab/catering.git
- **Branch**: main
- **Automatic sync**: Configured with Vercel

### Vercel Configuration
- **Project**: catherineh-lab-catering
- **Domain**: https://catherineh-lab-catering.vercel.app
- **Auto-deployment**: Enabled from GitHub main branch
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### Environment Variables (if needed)
```env
# n8n Webhook URL
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://n8n.ax-con.com/webhook/catherineh-lab-b2b-lead

# Additional environment variables can be added here
```

## 🔧 n8n Workflow Setup Instructions

### 1. Credential Configuration
Replace all placeholder values in `n8n_workflow.json`:

**Google Drive OAuth2**:
- Replace: `REPLACE_WITH_ACTUAL_DRIVE_CREDENTIAL_ID`
- With: Actual Google Drive OAuth2 credential ID

**Google Sheets API**:
- Replace: `REPLACE_WITH_ACTUAL_SHEETS_CREDENTIAL_ID`  
- With: Actual Google Sheets API credential ID

**Telegram Bot**:
- Replace: `REPLACE_WITH_ACTUAL_TELEGRAM_CREDENTIAL_ID`
- With: Actual Telegram bot credential ID
- Replace: `REPLACE_WITH_ACTUAL_TELEGRAM_CHAT_ID`
- With: Numeric Chat ID (e.g., 123456789)

**SMTP Email**:
- Replace: `REPLACE_WITH_ACTUAL_SMTP_CREDENTIAL_ID`
- With: Gmail SMTP credential ID (with app password)

### 2. Resource IDs Configuration
- **Google Drive Folder**: Replace `1ABC123XYZ_REPLACE_WITH_ACTUAL_FOLDER_ID`
- **Google Sheet**: Replace `1ABC123XYZ_REPLACE_WITH_ACTUAL_SHEET_ID`

### 3. Activation Steps
1. Import workflow JSON to n8n
2. Configure all credentials
3. Update resource IDs
4. Activate workflow (toggle switch)
5. Test with webhook endpoint

## 🧪 Testing Procedures

### Webhook Testing
```bash
# Test command
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

### Expected Responses
- **Success**: HTTP 200 with workflow execution results
- **Workflow inactive**: HTTP 404 "webhook not registered"
- **Configuration error**: HTTP 500 "Error in workflow"

## 🐛 Common Issues & Solutions

### n8n Workflow Issues

**HTTP 404 - Webhook not registered**
- ✅ Solution: Activate workflow in n8n editor

**HTTP 500 - Error in workflow**
- ✅ Check: All placeholder credentials replaced
- ✅ Check: Resource IDs configured
- ✅ Check: Node connections intact

**Telegram "Bad request"**
- ✅ Solution: Verify Chat ID format (numbers, not strings)
- ✅ Solution: Check message formatting

**Telegram "Forbidden"**
- ✅ Solution: Start conversation with bot using /start
- ✅ Solution: Verify bot is active and responding

**Email "No recipients defined"**
- ✅ Solution: Configure To Email field as `{{ $json.email }}`
- ✅ Solution: Verify form data contains email field

**Gmail SMTP "Application-specific password required"**
- ✅ Solution: Generate Gmail app password
- ✅ Solution: Use app password instead of regular password

### Deployment Issues

**Vercel Build Failures**
- ✅ Check: package.json dependencies
- ✅ Check: Next.js configuration
- ✅ Check: Build scripts

**Domain Configuration**
- ✅ Check: DNS settings
- ✅ Check: Vercel domain configuration

## 📚 Reference Documentation

### Setup Guides
- `gmail_smtp_fix_guide.md` - Gmail app password setup
- `telegram_fix_guide.md` - Telegram bot configuration
- `chatid_setup_example.md` - Chat ID retrieval process
- `workflow_activation_guide.md` - n8n activation steps
- `workflow_diagnosis.md` - Troubleshooting procedures

### Testing Scripts
- `test_workflow.js` - Workflow simulation
- `test_webhook.sh` - Endpoint testing

## 🔄 Development Workflow

### Making Changes
1. **Frontend Changes**: Edit Next.js components → Git push → Auto-deploy via Vercel
2. **Workflow Changes**: Update n8n workflow → Export JSON → Commit to repo
3. **Configuration**: Update environment variables in Vercel dashboard

### Git Workflow
```bash
# Standard workflow
git add .
git commit -m "feat: description of changes"
git push origin main
# Auto-deployment triggers on Vercel
```

## 📊 Performance Metrics

### Success Criteria
- **Webhook Response**: < 5 seconds
- **Email Delivery**: < 10 seconds  
- **Telegram Notification**: < 5 seconds
- **Data Storage**: < 3 seconds
- **Overall Availability**: > 99%

### Monitoring
- **n8n Execution Logs**: Check workflow execution history
- **Vercel Analytics**: Monitor deployment and performance
- **Email Delivery**: Monitor SMTP success rates
- **Telegram API**: Monitor bot response rates

## 🎯 Next Steps & Improvements

### Potential Enhancements
1. **Form Validation**: Client-side validation before webhook submission
2. **Rate Limiting**: Prevent spam submissions
3. **Analytics**: Track conversion rates and form completion
4. **Multi-language**: Support for English forms
5. **CRM Integration**: Direct integration with CRM systems
6. **Automated Follow-up**: Scheduled follow-up email sequences

### Maintenance Tasks
1. **Credential Rotation**: Regular password and token updates
2. **Monitoring**: Set up alerts for workflow failures
3. **Backup**: Regular backup of n8n workflows
4. **Performance**: Monitor and optimize response times
5. **Security**: Regular security audits

---

## 🆘 Emergency Contacts & Troubleshooting

### Quick Fix Commands
```bash
# Restart workflow (if needed)
# Access n8n dashboard and toggle workflow activation

# Check deployment status
vercel --version
vercel project ls

# Test webhook endpoint
curl -X POST https://n8n.ax-con.com/webhook/catherineh-lab-b2b-lead

# Check GitHub sync
git status
git log --oneline -5
```

### Key URLs
- **Production Site**: https://catherineh-lab-catering.vercel.app
- **n8n Workflow**: https://n8n.ax-con.com/workflow/ndU16DMEAaQkfVzC
- **GitHub Repo**: https://github.com/catherinehlab/catering
- **Vercel Dashboard**: https://vercel.com/catherinehlabs-projects/catherineh-lab-catering

---

**Last Updated**: 2024-08-23  
**Documentation Version**: 1.0  
**Project Status**: ✅ Production Ready