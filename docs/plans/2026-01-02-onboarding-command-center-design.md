# AiGS Employee Onboarding Command Center - Design Document

**Date:** 2026-01-02
**Project:** AiGS Onboarding Command Center
**Purpose:** Enterprise-grade HR automation demo/portfolio piece

## Architecture Overview

### Tech Stack
- **React 18** with Vite for fast development
- **Tailwind CSS** for styling with brand colors
- **Custom hooks** for API logic and polling
- **No state management library** - component state and prop passing

### State Management Strategy
Local component state in `App.jsx` with prop passing. In-memory data storage (session-based).

**Core State:**
```javascript
- activeTab: 'new' | 'active' | 'completed'
- onboardings: { active: [], completed: [] }
- currentOnboarding: null (tracked in real-time)
- isPolling: boolean
```

## Component Structure

### Main Layout Components
1. **Header** - AiGS logo, tagline, "Employee Onboarding Command Center" title
2. **TabNavigation** - Three tabs with active state indicator
3. **Footer** - Branding and attribution

### New Onboarding Tab
4. **NewOnboardingForm** - Left side form with validation
   - All input fields with proper types and validation
   - Multi-select checkboxes for equipment
   - Submit button with loading state

5. **LiveProgressPanel** - Right side real-time progress
   - Shows after submission
   - Progress bar with percentage
   - Current step indicator
   - List of all steps with status icons
   - Completion summary with resource links

6. **DemoScenarios** - Collapsible panel with 4 pre-built scenarios
   - One-click form population
   - Testing and demonstration helper

### Dashboard Tabs
7. **ActiveOnboardingsTable** - In-progress onboardings
   - Employee name, department, start date
   - Live progress bar in table
   - Current status text
   - Expandable detail view

8. **CompletedOnboardingsTable** - Historical view
   - Completed timestamp
   - Total duration
   - Quick links to generated resources

### Supporting Components
9. **ProgressStep** - Reusable step indicator
   - Three states: pending (○), in_progress (◉ with pulse), complete (✓)
   - Icon, label, and status

## Data Flow & API Integration

### Form Submission Flow
1. User fills form → validates → clicks "Start Onboarding →"
2. `POST` to `{WEBHOOK_URL}/onboarding/start` with form data
3. Receive response with `onboarding_id` and initial status
4. Store onboarding in "active" list
5. Show `LiveProgressPanel`
6. Start polling immediately

### Polling Mechanism
Custom hook `useStatusPolling`:
- Takes `onboardingId` as input
- Polls `GET {WEBHOOK_URL}/onboarding/status?id={id}` every 2 seconds
- Returns current progress state
- Auto-stops when status is 'complete' or 'error'
- Cleans up interval on unmount

### State Transitions
- **Active:** `status: 'provisioning' | 'scheduling' | 'notifying'`
- **Complete:** Moves from active → completed list, shows summary
- **Error:** Shows error message with retry option

### Environment Configuration
`.env` file with `VITE_WEBHOOK_URL` for n8n webhook base URL

## UI/UX & Styling

### Color Scheme (Tailwind Custom Config)
- Primary navy (`#1a365d`) - header, main CTAs
- Accent blue (`#3182ce`) - interactive elements, links
- Success green (`#38a169`) - completed steps, 100% progress
- Warning orange (`#dd6b20`) - in-progress indicators
- Error red (`#e53e3e`) - validation errors, failures
- Light gray (`#f7fafc`) - main app background
- Dark slate (`#1e293b`) - cards, form containers

### Progress Visualization

**Progress Bar:**
- Smooth width transition (`transition-all duration-300`)
- Color gradient: blue (0-99%) → green (100%)
- Percentage text overlay
- Rounded corners, subtle shadow

**Step List:**
- Pending: Gray text, hollow circle (○)
- In Progress: Orange pulsing dot (◉) with `animate-pulse`
- Complete: Green checkmark (✓) with scale-in animation
- Each step shows icon + label

### Form Design
- Clean, spacious inputs with proper padding
- Labels above inputs (accessible)
- Required fields marked with red asterisk
- Inline validation errors below each field
- Disabled state while submitting
- Submit button transforms: "Start Onboarding →" → spinner + "Starting..."

### Responsive Breakpoints
- **Desktop (1024px+):** Side-by-side form and progress panel
- **Tablet (768px-1023px):** Stacked full-width sections
- **Mobile (<768px):** Single column, collapsible demo scenarios

## Error Handling & Edge Cases

### Form Validation
**Client-side validation before submit:**
- Required: first name, last name, personal email, department, start date
- Email format validation (regex)
- Start date must be today or future
- Show inline errors on blur and submit attempt

### API Error Scenarios

1. **Network failure:**
   - Error toast/banner: "Unable to connect. Check your internet connection."
   - Retry button to resubmit

2. **API error response:**
   - Display `error_message` from API
   - Option to edit form and resubmit

3. **Polling timeout:**
   - If stuck >5 minutes: Show warning
   - "This is taking longer than expected. The process is still running."
   - Keep polling but notify user

4. **Lost connection during polling:**
   - Detect failed fetch
   - Show "Connection lost - reconnecting..." banner
   - Retry with exponential backoff

### Edge Cases
- **User navigates away:** Polling stops, backend continues
- **Multiple simultaneous onboardings:** Independent polling, all in Active tab
- **Demo scenario override:** Confirm before replacing form data
- **Tab switching:** Preserve current onboarding progress state

### Loading States
- Form submission: button spinner + disabled form
- Polling: smooth progress updates
- Empty states: Friendly messages for empty Active/Completed tabs

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
│   ├── DemoScenarios.jsx
│   └── Footer.jsx
├── hooks/
│   ├── useOnboardingSubmit.js
│   └── useStatusPolling.js
├── utils/
│   └── api.js
├── config/
│   ├── constants.js
│   ├── scenarios.js
│   └── steps.js
├── App.jsx
├── index.css
└── main.jsx
```

## Configuration Files

### Steps Configuration
```javascript
export const ONBOARDING_STEPS = [
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
```

### Demo Scenarios
4 pre-built scenarios:
1. Engineering New Hire (Sarah Chen)
2. Sales Executive (Marcus Williams)
3. Marketing Manager (Emily Rodriguez)
4. Finance Analyst (James Thompson)

## Implementation Notes

- Keep components focused and single-responsibility
- Use semantic HTML for accessibility
- Implement proper ARIA labels for screen readers
- Test with keyboard navigation
- Ensure color contrast meets WCAG AA standards
- No external UI libraries - custom Tailwind components only
- Environment variable for webhook URL configuration
- Clean, minimal approach - no feature bloat

## Success Criteria

✓ Form submits to real n8n webhook
✓ Real-time progress updates every 2 seconds
✓ Smooth animations and transitions
✓ Professional enterprise look and feel
✓ Fully responsive across devices
✓ Proper error handling and loading states
✓ Demo scenarios for easy testing
✓ Clean, maintainable codebase
