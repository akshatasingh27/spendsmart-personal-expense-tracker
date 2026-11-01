// storage.js
// This file handles all localStorage read/write operations.
// localStorage is a browser feature that saves data even after the page is refreshed.

const TRANSACTIONS_KEY = 'expense_tracker_transactions';
const BUDGET_KEY = 'expense_tracker_budget';

// Load transactions from localStorage. Returns an empty array if none saved yet.
export function loadTransactions() {
  try {
    const data = localStorage.getItem(TRANSACTIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading transactions:', error);
    return [];
  }
}

// Save the full transactions array to localStorage.
export function saveTransactions(transactions) {
  try {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error('Error saving transactions:', error);
  }
}

// Load monthly budget setting.
export function loadBudget() {
  try {
    const data = localStorage.getItem(BUDGET_KEY);
    return data ? JSON.parse(data) : { monthly: 0 };
  } catch (error) {
    console.error('Error loading budget:', error);
    return { monthly: 0 };
  }
}

// Save budget setting.
export function saveBudget(budget) {
  try {
    localStorage.setItem(BUDGET_KEY, JSON.stringify(budget));
  } catch (error) {
    console.error('Error saving budget:', error);
  }
}

// Completely clear all saved data (used by reset demo).
export function clearAllData() {
  localStorage.removeItem(TRANSACTIONS_KEY);
  localStorage.removeItem(BUDGET_KEY);
}
