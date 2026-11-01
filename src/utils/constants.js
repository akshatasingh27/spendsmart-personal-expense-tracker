// constants.js — shared lists used across the whole app.

export const CATEGORIES = [
  'Food',
  'Shopping',
  'Transport',
  'Education',
  'Bills',
  'Entertainment',
  'Health',
  'Salary',
  'Freelance',
  'Other',
];

export const CATEGORY_COLORS = {
  Food: '#f87171',
  Shopping: '#fb923c',
  Transport: '#facc15',
  Education: '#34d399',
  Bills: '#60a5fa',
  Entertainment: '#a78bfa',
  Health: '#f472b6',
  Salary: '#4ade80',
  Freelance: '#22d3ee',
  Other: '#94a3b8',
};

// Demo transactions pre-loaded on first visit or after reset.
export const DEMO_TRANSACTIONS = [
  { id: 'd1', title: 'Monthly Salary', amount: 50000, category: 'Salary', type: 'income', date: '2026-11-01', notes: 'November salary' },
  { id: 'd2', title: 'Grocery Shopping', amount: 3200, category: 'Food', type: 'expense', date: '2026-11-02', notes: 'Weekly groceries' },
  { id: 'd3', title: 'Electricity Bill', amount: 1800, category: 'Bills', type: 'expense', date: '2026-11-03', notes: '' },
  { id: 'd4', title: 'Uber Rides', amount: 850, category: 'Transport', type: 'expense', date: '2026-11-04', notes: 'Office commute' },
  { id: 'd5', title: 'Netflix Subscription', amount: 649, category: 'Entertainment', type: 'expense', date: '2026-11-05', notes: '' },
  { id: 'd6', title: 'Freelance Project', amount: 15000, category: 'Freelance', type: 'income', date: '2026-10-28', notes: 'Logo design project' },
  { id: 'd7', title: 'Doctor Visit', amount: 1200, category: 'Health', type: 'expense', date: '2026-10-25', notes: 'General checkup' },
  { id: 'd8', title: 'Online Course', amount: 2999, category: 'Education', type: 'expense', date: '2026-10-20', notes: 'React course on Udemy' },
  { id: 'd9', title: 'Restaurant Dinner', amount: 2100, category: 'Food', type: 'expense', date: '2026-10-18', notes: 'Birthday dinner' },
  { id: 'd10', title: 'Monthly Salary', amount: 50000, category: 'Salary', type: 'income', date: '2026-10-01', notes: 'October salary' },
];
