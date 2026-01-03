# Claude Code Prompt: AiGS Employee Onboarding Command Center

## Project Overview

Build a React application that serves as a complete Employee Onboarding Command Center for AiGS (Ai Global Solutions). This is a demo/portfolio piece showcasing enterprise-grade HR automation. The app handles new hire submissions, displays real-time onboarding progress via polling, and provides a dashboard of all onboardings.

## Tech Stack

- React (Vite)
- Tailwind CSS for styling
- No additional UI libraries needed—keep it clean and lightweight

## Brand Guidelines

**Company:** AiGS (Ai Global Solutions)
**Tagline:** "AI-Powered Process Automation & Data Intelligence"
**Color Palette:**
- Primary: Deep blue/navy (#1a365d)
- Accent: Bright blue (#3182ce)
- Success: Green (#38a169)
- Warning: Orange (#dd6b20)
- Error/Critical: Red (#e53e3e)
- Background: Light gray (#f7fafc)
- Dark Background: Slate (#1e293b)
- Text: Dark gray (#2d3748)

**Tone:** Professional, enterprise-grade, but approachable

---

## API Endpoints

### 1. Start Onboarding
**Endpoint:** `POST [WEBHOOK_URL]/onboarding/start`

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
  "accounts_created": {
    "google_workspace": { "status": "created", "email": "sarah.chen@aigs-demo.com" },
    "slack": { "status": "created", "username": "sarah.chen" },
    "jira": { "status": "created", "username": "schen" }
  },
  "documents": {
    "welcome_packet": "https://drive.google.com/...",
    "notion_page": "https://notion.so/..."
  },
  "calendar_events_created": 5,
  "notifications_sent": {
    "new_hire": true,
    "manager": true,
    "it_team": true
  },
  "dashboard_url": "https://notion.so/...",
  "processed_at": "2025-01-10T09:15:30Z"
}
```

### 2. Poll Status
**Endpoint:** `GET [WEBHOOK_URL]/onboarding/status?id={onboarding_id}`

**Response:**
```json
{
  "success": true,
  "onboarding_id": "ONB-2025-00042",
  "employee_name": "Sarah Chen",
  "employee_email": "sarah.chen@aigs-demo.com",
  "department": "Engineering",
  "status": "provisioning",
  "progress_percent": 25,
  "current_step": "Creating Slack account...",
  "steps": {
    "google_workspace": "complete",
    "slack": "in_progress",
    "jira": "pending",
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

---

## Application Structure

### Main Sections

#### 1. Header
- AiGS logo/text
- Tagline
- "Employee Onboarding Command Center" title
- Navigation tabs: "New Onboarding" | "Active" | "Completed"

#### 2. New Onboarding Tab (Form + Live Progress)

**Left Side: New Hire Form**
- First Name* (text)
- Last Name* (text)
- Personal Email* (email)
- Department* (dropdown: Engineering, Sales, Marketing, Operations, Finance, HR, Legal)
- Job Title (text)
- Manager Name (text)
- Manager Email (email)
- Start Date* (date picker)
- Location (dropdown: Remote - US, Remote - International, New York Office, San Francisco Office, Austin Office)
- Equipment Needed (multi-select checkboxes):
  - Laptop
  - External Monitor
  - Headset
  - Keyboard/Mouse
  - Standing Desk
- Submit button: "Start Onboarding →"

**Right Side: Live Progress Panel**
Only visible after form submission. Shows real-time progress:

```
┌─────────────────────────────────────────────────┐
│  Onboarding: ONB-2025-00042                     │
│  Sarah Chen - Senior Developer                  │
│  Engineering Department                         │
│                                                 │
│  ████████████░░░░░░░░░░░░░  45%                │
│                                                 │
│  Current: Creating Notion employee page...      │
│                                                 │
│  ✓ Initialize onboarding                        │
│  ✓ Google Workspace account                     │
│  ✓ Slack account & channels                     │
│  ✓ Jira account                                 │
│  ✓ Welcome packet PDF                           │
│  ◉ Notion employee page          ← (animated)  │
│  ○ Calendar events                              │
│  ○ New hire welcome email                       │
│  ○ Manager notification                         │
│  ○ IT team notification                         │
└─────────────────────────────────────────────────┘
```

When complete, show summary with links:
- View Welcome Packet (link)
- View Notion Page (link)
- View Dashboard (link)

#### 3. Active Onboardings Tab (Dashboard)

Table showing all in-progress onboardings:

| Employee | Department | Start Date | Progress | Status | Actions |
|----------|------------|------------|----------|--------|---------|
| Sarah Chen | Engineering | Jan 15 | ████░░ 60% | Scheduling | View |
| John Smith | Sales | Jan 20 | ██░░░░ 25% | Provisioning | View |

Clicking "View" opens a modal or expands to show detailed progress.

#### 4. Completed Onboardings Tab (History)

Table showing completed onboardings:

| Employee | Department | Start Date | Completed | Duration | Resources |
|----------|------------|------------|-----------|----------|-----------|
| Alex Kim | Marketing | Jan 5 | Jan 3 | 4m 32s | 📄 📋 📅 |

Resource icons link to: Welcome Packet, Notion Page, Calendar

#### 5. Demo Scenarios Panel
Collapsible sidebar or section with pre-built test scenarios:

**Scenario 1: Engineering New Hire**
```
First Name: Sarah
Last Name: Chen
Personal Email: sarah.chen@example.com
Department: Engineering
Title: Senior Developer
Manager Name: Mike Johnson
Manager Email: mike.johnson@aigs-demo.com
Start Date: [2 weeks from today]
Location: Remote - US
Equipment: Laptop, External Monitor, Headset
```

**Scenario 2: Sales Executive**
```
First Name: Marcus
Last Name: Williams
Personal Email: m.williams@example.com
Department: Sales
Title: Account Executive
Manager Name: Jennifer Adams
Manager Email: j.adams@aigs-demo.com
Start Date: [1 week from today]
Location: New York Office
Equipment: Laptop, Headset
```

**Scenario 3: Marketing Manager**
```
First Name: Emily
Last Name: Rodriguez
Personal Email: e.rodriguez@example.com
Department: Marketing
Title: Marketing Manager
Manager Name: David Park
Manager Email: d.park@aigs-demo.com
Start Date: [3 weeks from today]
Location: San Francisco Office
Equipment: Laptop, External Monitor, Standing Desk
```

**Scenario 4: Finance Analyst**
```
First Name: James
Last Name: Thompson
Personal Email: j.thompson@example.com
Department: Finance
Title: Senior Financial Analyst
Manager Name: Lisa Chen
Manager Email: l.chen@aigs-demo.com
Start Date: [Next Monday]
Location: Austin Office
Equipment: Laptop, External Monitor, Keyboard/Mouse
```

#### 6. Footer
- "Powered by n8n + AI"
- "Demo by AiGS"
- Link to AiGS website (https://www.aigs.com)

---

## Real-Time Progress Implementation

### Polling Logic

```javascript
// After form submission:
// 1. Call POST /onboarding/start
// 2. Get onboarding_id from response
// 3. Start polling GET /onboarding/status?id={id} every 2 seconds
// 4. Update UI with each response
// 5. Stop polling when status === "complete" or "error"

const pollStatus = async (onboardingId) => {
  const poll = setInterval(async () => {
    const response = await fetch(`${WEBHOOK_URL}/onboarding/status?id=${onboardingId}`);
    const data = await response.json();
    
    setProgress(data);
    
    if (data.status === 'complete' || data.status === 'error') {
      clearInterval(poll);
    }
  }, 2000);
};
```

### Progress Step Mapping

```javascript
const STEPS = [
  { key: 'google_workspace', label: 'Google Workspace Account', icon: '📧' },
  { key: 'slack', label: 'Slack Account & Channels', icon: '💬' },
  { key: 'jira', label: 'Jira Account', icon: '📋' },
  { key: 'welcome_pdf', label: 'Welcome Packet PDF', icon: '📄' },
  { key: 'notion_page', label: 'Notion Employee Page', icon: '📝' },
  { key: 'calendar_events', label: 'Calendar Events', icon: '📅' },
  { key: 'email_newhire', label: 'New Hire Welcome Email', icon: '✉️' },
  { key: 'notify_manager', label: 'Manager Notification', icon: '👔' },
  { key: 'notify_it', label: 'IT Team Notification', icon: '🖥️' }
];

// Status values: 'pending', 'in_progress', 'complete', 'error'
```

---

## UI/UX Details

### Progress Bar Animation
- Smooth transition on percentage changes
- Color changes: Blue (in progress) → Green (complete)
- Pulse animation on current step

### Step List Animation
- Checkmark appears with a small scale animation
- Current step has a pulsing dot
- Pending steps are grayed out

### Form Validation
- Required fields marked with *
- Inline validation errors
- Email format validation
- Date must be in the future

### Loading States
- Form submit button shows spinner
- "Starting onboarding..." text
- Disable form while processing

### Error Handling
- Network errors: Show retry button
- API errors: Display error message from response
- Timeout: After 5 minutes with no progress, show warning

### Responsive Design
- Desktop: Side-by-side form and progress
- Tablet: Stacked layout
- Mobile: Full-width, collapsible sections

---

## State Management

```javascript
// Main state structure
const [activeTab, setActiveTab] = useState('new'); // 'new', 'active', 'completed'
const [formData, setFormData] = useState({...});
const [isSubmitting, setIsSubmitting] = useState(false);
const [currentOnboarding, setCurrentOnboarding] = useState(null);
const [progress, setProgress] = useState(null);
const [activeOnboardings, setActiveOnboardings] = useState([]);
const [completedOnboardings, setCompletedOnboardings] = useState([]);
```

---

## File Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── TabNavigation.jsx
│   ├── NewOnboardingForm.jsx
│   ├── LiveProgressPanel.jsx
│   ├── ProgressStep.jsx
│   ├── ActiveOnboardingsTable.jsx
│   ├── CompletedOnboardingsTable.jsx
│   ├── OnboardingDetailModal.jsx
│   ├── DemoScenarios.jsx
│   └── Footer.jsx
├── hooks/
│   ├── useOnboardingSubmit.js
│   └── useStatusPolling.js
├── utils/
│   └── api.js
├── config/
│   ├── scenarios.js
│   └── steps.js
├── App.jsx
├── index.css
└── main.jsx
```

---

## Configuration

```javascript
// src/config/index.js
export const WEBHOOK_BASE_URL = import.meta.env.VITE_WEBHOOK_URL || 'http://localhost:5678/webhook';

export const POLLING_INTERVAL = 2000; // 2 seconds

export const DEPARTMENTS = [
  'Engineering',
  'Sales', 
  'Marketing',
  'Operations',
  'Finance',
  'HR',
  'Legal'
];

export const LOCATIONS = [
  'Remote - US',
  'Remote - International',
  'New York Office',
  'San Francisco Office',
  'Austin Office'
];

export const EQUIPMENT_OPTIONS = [
  { id: 'laptop', label: 'Laptop' },
  { id: 'monitor', label: 'External Monitor' },
  { id: 'headset', label: 'Headset' },
  { id: 'keyboard', label: 'Keyboard/Mouse' },
  { id: 'desk', label: 'Standing Desk' }
];
```

---

## Environment Variables

```
# .env.example
VITE_WEBHOOK_URL=https://your-n8n-instance.com/webhook
```

---

## Deliverables

1. Fully functional React application
2. README with setup instructions
3. Environment variable example (.env.example)
4. Build ready for deployment (Vercel, Netlify, or static hosting)

---

## Nice-to-Have Features (if time permits)

1. Dark mode toggle (brand is already dark-friendly)
2. Sound effect on completion (subtle chime)
3. Confetti animation when onboarding completes
4. Export completed onboardings to CSV
5. Filter/search in tables
6. Estimated time remaining based on average completion

---

## Key UX Moments

1. **Form Submit** - Button transforms to progress indicator
2. **First Step Complete** - Satisfying checkmark animation
3. **Progress Updates** - Smooth bar animation, current step highlight
4. **Completion** - Celebratory moment (confetti optional), clear summary
5. **Error State** - Clear messaging, retry option, no dead ends

This should feel like a polished internal tool that a real enterprise would use.
