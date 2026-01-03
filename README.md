# AiGS Employee Onboarding Command Center

A professional, enterprise-grade React application for automating employee onboarding workflows. Built as a demo/portfolio piece showcasing AI-powered process automation with real-time progress tracking.

## Features

- **Real-time Progress Tracking** - Live updates via polling (2-second intervals)
- **Complete Onboarding Form** - Validation, error handling, and demo scenarios
- **Dashboard Views** - Active and completed onboardings at a glance
- **Professional UI** - Clean, responsive design with AiGS branding
- **n8n Integration** - Connects to n8n webhook endpoints for backend automation

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast development and build tool
- **Tailwind CSS** - Utility-first styling with custom brand colors
- **n8n** - Backend workflow automation (separate setup required)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- n8n instance with webhook endpoints configured (see API section below)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "AiGS Onboarding Command Center"
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` and add your n8n webhook URL:
```
VITE_WEBHOOK_URL=https://your-n8n-instance.com/webhook
```

5. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory, ready for deployment to Vercel, Netlify, or any static hosting service.

## Required API Endpoints

Your n8n workflow must implement these endpoints:

### 1. Start Onboarding
**POST** `/onboarding/start`

**Request Body:**
```json
{
  "first_name": "Sarah",
  "last_name": "Chen",
  "personal_email": "sarah.chen@gmail.com",
  "department": "Engineering",
  "title": "Senior Developer",
  "manager_name": "Mike Johnson",
  "manager_email": "mike.johnson@company.com",
  "start_date": "2025-01-15",
  "location": "Remote - US",
  "equipment_needed": ["laptop", "monitor", "headset"]
}
```

**Response:**
```json
{
  "success": true,
  "onboarding_id": "ONB-2025-00042",
  "employee_id": "EMP-2025-00042",
  "employee": {
    "full_name": "Sarah Chen",
    "corporate_email": "sarah.chen@aigs-demo.com",
    "department": "Engineering",
    "title": "Senior Developer",
    "start_date": "2025-01-15"
  },
  "documents": {
    "welcome_packet": "https://drive.google.com/...",
    "notion_page": "https://notion.so/..."
  },
  "dashboard_url": "https://notion.so/...",
  "processed_at": "2025-01-10T09:15:30Z"
}
```

### 2. Get Status
**GET** `/onboarding/status?id={onboarding_id}`

**Response:**
```json
{
  "success": true,
  "onboarding_id": "ONB-2025-00042",
  "employee_name": "Sarah Chen",
  "employee_email": "sarah.chen@aigs-demo.com",
  "department": "Engineering",
  "status": "provisioning",
  "progress_percent": 45,
  "current_step": "Creating Notion employee page...",
  "steps": {
    "google_workspace": "complete",
    "slack": "complete",
    "jira": "in_progress",
    "welcome_pdf": "pending",
    "notion_page": "pending",
    "calendar_events": "pending",
    "email_newhire": "pending",
    "notify_manager": "pending",
    "notify_it": "pending"
  },
  "started_at": "2025-01-10T09:15:00Z",
  "completed_at": null,
  "error_message": null
}
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx
│   ├── TabNavigation.jsx
│   ├── NewOnboardingForm.jsx
│   ├── LiveProgressPanel.jsx
│   ├── ProgressStep.jsx
│   ├── ActiveOnboardingsTable.jsx
│   ├── CompletedOnboardingsTable.jsx
│   ├── DemoScenarios.jsx
│   └── Footer.jsx
├── hooks/              # Custom React hooks
│   ├── useOnboardingSubmit.js
│   └── useStatusPolling.js
├── utils/              # Utility functions
│   └── api.js
├── config/             # Configuration files
│   ├── constants.js
│   ├── scenarios.js
│   └── steps.js
├── App.jsx            # Main app component
├── index.css          # Global styles
└── main.jsx           # Entry point
```

## Brand Guidelines

**AiGS (Ai Global Solutions)**
- Tagline: "AI-Powered Process Automation & Data Intelligence"
- Primary Color: Deep Navy (#1a365d)
- Accent Color: Bright Blue (#3182ce)
- Success: Green (#38a169)
- Warning: Orange (#dd6b20)
- Error: Red (#e53e3e)

## Demo Scenarios

The app includes 4 pre-built demo scenarios for easy testing:
1. Engineering New Hire (Sarah Chen)
2. Sales Executive (Marcus Williams)
3. Marketing Manager (Emily Rodriguez)
4. Finance Analyst (James Thompson)

Click any scenario to auto-fill the form with sample data.

## Features in Detail

### Real-time Polling
- Polls status endpoint every 2 seconds
- Auto-stops when onboarding completes or errors
- Connection error handling with retry logic
- Progress bar and step-by-step visualization

### Form Validation
- Required field validation
- Email format checking
- Future date validation for start dates
- Inline error messages
- Touch-based validation (shows errors after blur)

### State Management
- In-memory storage (session-based)
- Active onboardings tracked separately from completed
- Smooth transitions between states
- Preserved during tab switches

## Deployment

This app is ready to deploy to:
- **Vercel** - `vercel deploy`
- **Netlify** - Drag and drop the `dist/` folder
- **Any static host** - Upload the `dist/` folder

Remember to set the `VITE_WEBHOOK_URL` environment variable in your deployment platform.

## License

This is a demo/portfolio project by AiGS.

## Support

For questions or issues, contact AiGS at [https://www.aigs.com](https://www.aigs.com)
