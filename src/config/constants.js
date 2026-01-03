export const WEBHOOK_START_URL = import.meta.env.VITE_WEBHOOK_START_URL || 'http://localhost:5678/webhook/onboarding/start';
export const WEBHOOK_STATUS_URL = import.meta.env.VITE_WEBHOOK_STATUS_URL || 'http://localhost:5678/webhook/onboarding/status';

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
