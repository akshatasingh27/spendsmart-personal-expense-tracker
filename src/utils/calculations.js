// calculations.js
// Pure helper functions for financial calculations.
// "Pure" means they only depend on their inputs and have no side effects.

// Format a number as Indian Rupee currency string. Example: 12500 → "₹12,500.00"
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount);
}

// Add up all transactions whose type is 'income'.
export function getTotalIncome(transactions) {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);
}

// Add up all transactions whose type is 'expense'.
export function getTotalExpenses(transactions) {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);
}

// Balance = total income minus total expenses.
export function getBalance(transactions) {
  return getTotalIncome(transactions) - getTotalExpenses(transactions);
}

// Get expenses for the current calendar month only.
export function getCurrentMonthExpenses(transactions) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return transactions
    .filter((t) => {
      const d = new Date(t.date);
      return (
        t.type === 'expense' &&
        d.getMonth() === currentMonth &&
        d.getFullYear() === currentYear
      );
    })
    .reduce((sum, t) => sum + Number(t.amount), 0);
}

// Build monthly chart data for the last 6 months.
// Returns an array like: [{ month: 'Jun', income: 5000, expense: 3000 }, ...]
export function getMonthlyChartData(transactions) {
  const months = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const monthIndex = date.getMonth();

    const income = transactions
      .filter((t) => {
        const d = new Date(t.date);
        return (
          t.type === 'income' &&
          d.getMonth() === monthIndex &&
          d.getFullYear() === year
        );
      })
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expense = transactions
      .filter((t) => {
        const d = new Date(t.date);
        return (
          t.type === 'expense' &&
          d.getMonth() === monthIndex &&
          d.getFullYear() === year
        );
      })
      .reduce((sum, t) => sum + Number(t.amount), 0);

    months.push({ month: `${month} '${String(year).slice(-2)}`, income, expense });
  }

  return months;
}

// Build category breakdown for expense pie chart.
// Returns: [{ name: 'Food', value: 3000 }, ...]
export function getCategoryChartData(transactions) {
  const categoryMap = {};
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + Number(t.amount);
    });

  return Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

// Sort an array of transactions by given field and direction.
export function sortTransactions(transactions, field, direction) {
  return [...transactions].sort((a, b) => {
    let valA = field === 'amount' ? Number(a.amount) : new Date(a.date);
    let valB = field === 'amount' ? Number(b.amount) : new Date(b.date);
    return direction === 'asc' ? valA - valB : valB - valA;
  });
}

// Budget percentage used (capped at 100 for display).
export function getBudgetPercentage(spent, budget) {
  if (!budget || budget <= 0) return 0;
  return Math.min((spent / budget) * 100, 100);
}
