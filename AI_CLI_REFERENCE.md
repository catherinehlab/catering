# AI CLI Tools Reference - Catherine H Lab Catering Project

## 📖 Quick Reference for Cursor, Gemini CLI, Codex CLI

This document provides structured information for AI-powered CLI tools to understand and work with this project.

## 🎯 Project Context

**Project Type**: Next.js + n8n Automation  
**Primary Goal**: B2B catering lead processing with automated notifications  
**Status**: ✅ Production deployed  
**Complexity**: Moderate (Frontend + Workflow automation + Multi-service integration)

## 🧠 Key Technical Concepts

### Core Technologies
```yaml
Frontend:
  - Framework: Next.js 13+
  - Language: TypeScript/JavaScript
  - Styling: CSS/SCSS
  - Deployment: Vercel

Backend/Automation:
  - Platform: n8n (workflow automation)
  - Integration: Webhook → Multi-channel processing
  - Services: Gmail SMTP, Telegram Bot, Google APIs
  
Infrastructure:
  - Version Control: GitHub
  - CI/CD: Vercel automatic deployment
  - Domain: catherineh-lab-catering.vercel.app
```

### Workflow Architecture Pattern
```
Form Submission → Webhook → Parallel Processing:
├── Data Storage (Google Drive + Sheets)
├── Admin Notification (Telegram)
└── Customer Confirmation (Email)
```

## 🔧 Development Environment Setup

### Prerequisites
```bash
# Node.js and npm
node --version  # Should be 18+
npm --version

# Vercel CLI
npm i -g vercel
vercel --version

# Git configuration
git --version
```

### Project Initialization
```bash
# Clone repository
git clone https://github.com/catherinehlab/catering.git
cd catering

# Install dependencies
npm install

# Development server
npm run dev
```

## 📁 File Structure & Importance

### Critical Files (🔴 High Priority)
```
n8n_workflow.json              # Main workflow configuration - CRITICAL
package.json                   # Dependencies and scripts
next.config.js                 # Next.js configuration
vercel.json                   # Deployment configuration
pages/                        # Next.js routing and pages
components/                   # React components
```

### Configuration Files (🟡 Medium Priority)  
```
gmail_smtp_fix_guide.md       # Email setup instructions
telegram_fix_guide.md         # Bot configuration guide
workflow_activation_guide.md  # n8n setup steps
```

### Testing Files (🟢 Low Priority)
```
test_workflow.js              # Workflow testing script
test_webhook.sh              # API endpoint testing
```

## 🛠️ Common Development Tasks

### Frontend Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

### n8n Workflow Management
```bash
# Test webhook endpoint
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"test@example.com"}' \
  'https://n8n.ax-con.com/webhook/catherineh-lab-b2b-lead'

# Simulate workflow execution
node test_workflow.js
```

### Deployment & Version Control
```bash
# Standard git workflow
git add .
git commit -m "feat: description"
git push origin main
# Auto-deployment via Vercel

# Check deployment status
vercel project ls
```

## 🐛 Problem Resolution Patterns

### Workflow Issues
```yaml
HTTP_404_Webhook_Not_Found:
  cause: "n8n workflow not activated"
  solution: "Go to n8n dashboard → toggle workflow ON"
  
HTTP_500_Workflow_Error:
  cause: "Misconfigured credentials or nodes"
  solution: "Check all credential IDs and node connections"

Telegram_Forbidden:
  cause: "Bot not started or invalid Chat ID"
  solution: "Send /start to bot, get new Chat ID via getUpdates API"

Email_Authentication_Failed:
  cause: "Using regular password instead of app password"
  solution: "Generate Gmail app password in Google Account settings"
```

### Deployment Issues
```yaml
Vercel_Build_Failed:
  cause: "Missing dependencies or configuration error"
  solution: "Check package.json and next.config.js"
  
Domain_Not_Working:
  cause: "DNS or domain configuration issue"
  solution: "Check Vercel domain settings and DNS records"
```

## 📋 AI Assistant Instructions

### When Working with This Project:

**✅ Do These:**
- Always check `PROJECT_DOCUMENTATION.md` for complete project context
- Use existing patterns in `n8n_workflow.json` for workflow modifications
- Test webhook endpoints with the provided curl commands
- Follow the git workflow: edit → commit → push → auto-deploy
- Reference setup guides for service-specific configurations
- Check deployment status before marking tasks complete

**❌ Avoid These:**
- Don't create new workflow files without understanding the existing structure
- Don't modify credential IDs without proper configuration
- Don't deploy without testing the webhook endpoint first
- Don't ignore the existing file structure and naming conventions

### Typical Request Patterns:

**"Fix the n8n workflow"** 
→ Check `workflow_diagnosis.md` → Test individual nodes → Update configuration

**"Deploy to production"**
→ Git commit → Vercel deployment → Test live endpoint

**"Add new notification channel"**
→ Study existing nodes → Add parallel node → Update connections → Test

**"Debug webhook issues"**
→ Use `test_webhook.sh` → Check n8n execution logs → Follow troubleshooting guide

## 🔍 Debugging Workflow

### Step-by-Step Debugging
1. **Identify Issue**: Check error messages and HTTP status codes
2. **Locate Problem**: Use execution logs in n8n dashboard  
3. **Apply Solution**: Follow relevant guide from docs/ folder
4. **Test Fix**: Use testing scripts or manual curl commands
5. **Verify**: Confirm end-to-end workflow functionality

### Common Debug Commands
```bash
# Check project status
npm run build
vercel project ls
git status

# Test components individually
node test_workflow.js
curl -X POST [webhook_url] -d [test_data]

# Check logs
# → n8n dashboard → Executions tab
# → Vercel dashboard → Functions tab
```

## 📊 Success Metrics

### Working System Indicators
- ✅ Webhook responds with HTTP 200
- ✅ Email confirmation sent to customer  
- ✅ Telegram notification received by admin
- ✅ Data stored in Google Drive + Sheets
- ✅ Frontend form submits successfully
- ✅ Deployment accessible at production URL

### Performance Expectations
- **Response Time**: < 5 seconds for workflow completion
- **Availability**: > 99% uptime
- **Error Rate**: < 1% for production traffic

## 🎓 Learning Resources

### Understanding n8n Workflows
- Node-based automation platform
- JSON configuration files
- Expression syntax: `{{ $json.fieldName }}`
- Parallel processing capabilities
- Webhook triggers and HTTP responses

### Next.js + Vercel Pattern
- File-based routing system
- Automatic deployment from GitHub
- Environment variable management
- Build optimization and caching

### Service Integration Patterns
- OAuth2 for Google services
- Bot API for Telegram
- SMTP for email delivery
- Webhook architecture for real-time processing

---

## 💡 Pro Tips for AI Assistants

1. **Context First**: Always read `PROJECT_DOCUMENTATION.md` for full context
2. **Test Early**: Use provided testing scripts before making changes
3. **Follow Patterns**: Maintain consistency with existing code structure
4. **Document Changes**: Update relevant documentation files
5. **Validate End-to-End**: Ensure complete workflow functionality
6. **Check Dependencies**: Verify all services are properly configured

**This project demonstrates modern full-stack development with automation, making it an excellent reference for similar B2B lead processing systems.**