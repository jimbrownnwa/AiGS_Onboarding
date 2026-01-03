// Helper to get date X days/weeks from today
const getDateFromToday = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

export const DEMO_SCENARIOS = [
  {
    id: 'engineering',
    title: 'Engineering New Hire',
    icon: '💻',
    data: {
      first_name: 'Sarah',
      last_name: 'Chen',
      personal_email: 'sarah.chen@example.com',
      department: 'Engineering',
      title: 'Senior Developer',
      manager_name: 'Mike Johnson',
      manager_email: 'mike.johnson@aigs-demo.com',
      start_date: getDateFromToday(14), // 2 weeks from today
      location: 'Remote - US',
      equipment_needed: ['laptop', 'monitor', 'headset']
    }
  },
  {
    id: 'sales',
    title: 'Sales Executive',
    icon: '📊',
    data: {
      first_name: 'Marcus',
      last_name: 'Williams',
      personal_email: 'm.williams@example.com',
      department: 'Sales',
      title: 'Account Executive',
      manager_name: 'Jennifer Adams',
      manager_email: 'j.adams@aigs-demo.com',
      start_date: getDateFromToday(7), // 1 week from today
      location: 'New York Office',
      equipment_needed: ['laptop', 'headset']
    }
  },
  {
    id: 'marketing',
    title: 'Marketing Manager',
    icon: '📱',
    data: {
      first_name: 'Emily',
      last_name: 'Rodriguez',
      personal_email: 'e.rodriguez@example.com',
      department: 'Marketing',
      title: 'Marketing Manager',
      manager_name: 'David Park',
      manager_email: 'd.park@aigs-demo.com',
      start_date: getDateFromToday(21), // 3 weeks from today
      location: 'San Francisco Office',
      equipment_needed: ['laptop', 'monitor', 'desk']
    }
  },
  {
    id: 'finance',
    title: 'Finance Analyst',
    icon: '💼',
    data: {
      first_name: 'James',
      last_name: 'Thompson',
      personal_email: 'j.thompson@example.com',
      department: 'Finance',
      title: 'Senior Financial Analyst',
      manager_name: 'Lisa Chen',
      manager_email: 'l.chen@aigs-demo.com',
      start_date: getDateFromToday(7), // Next week
      location: 'Austin Office',
      equipment_needed: ['laptop', 'monitor', 'keyboard']
    }
  }
];
