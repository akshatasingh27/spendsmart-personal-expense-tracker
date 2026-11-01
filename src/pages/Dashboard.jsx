// Dashboard.jsx — Main overview page shown by default.
// Receives: transactions, budget, onSetBudget, onNavigate

import SummaryCard from '../components/SummaryCard';
import { MonthlyBarChart, CategoryPieChart } from '../components/ExpenseChart';
import BudgetCard from '../components/BudgetCard';
import { formatCurrency, getTotalIncome, getTotalExpenses, getBalance, getCurrentMonthExpenses } from '../utils/calculations';
import { CATEGORY_COLORS } from '../utils/constants';

// Last 5 transactions shown in "Recent" section
function RecentTransactions({ transactions, onNavigate }) {
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (recent.length === 0) {
    return (
      <div className="empty-state">
        <p>No transactions yet. Add your first one!</p>
        <button
          className="btn btn-primary"
          style={{ marginTop: 12 }}
          onClick={() => onNavigate('transactions')}
        >
          ➕ Add Transaction
        </button>
      </div>
    );
  }

  return (
    <div>
      {recent.map((tx) => {
        const color = CATEGORY_COLORS[tx.category] || '#94a3b8';
        return (
          <div className="recent-tx-item" key={tx.id}>
            <div className="tx-icon" style={{ background: color + '22', color }}>
              {tx.category[0]}
            </div>
            <div className="tx-info">
              <div className="title">{tx.title}</div>
              <div className="meta">
                {tx.category} • {new Date(tx.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
              </div>
            </div>
            <div style={{
              fontWeight: 700, fontSize: '0.9rem',
              color: tx.type === 'income' ? 'var(--accent-green)' : 'var(--accent-red)',
            }}>
              {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
            </div>
          </div>
        );
      })}
      <button
        className="btn btn-secondary"
        style={{ width: '100%', marginTop: 14, justifyContent: 'center' }}
        onClick={() => onNavigate('transactions')}
      >
        View All Transactions →
      </button>
    </div>
  );
}

export default function Dashboard({ transactions, budget, onSetBudget, onNavigate }) {
  const income   = getTotalIncome(transactions);
  const expenses = getTotalExpenses(transactions);
  const balance  = getBalance(transactions);
  const thisMonth = getCurrentMonthExpenses(transactions);

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your financial overview.</p>
      </div>

      {/* ── Summary Cards ── */}
      <div className="summary-grid">
        <SummaryCard
          title="Total Balance"
          value={formatCurrency(balance)}
          icon="💳"
          gradient="var(--gradient-purple)"
          subtitle="Income minus expenses"
        />
        <SummaryCard
          title="Total Income"
          value={formatCurrency(income)}
          icon="⬆️"
          gradient="var(--gradient-green)"
          subtitle="All time"
        />
        <SummaryCard
          title="Total Expenses"
          value={formatCurrency(expenses)}
          icon="⬇️"
          gradient="var(--gradient-red)"
          subtitle="All time"
        />
        <SummaryCard
          title="This Month"
          value={formatCurrency(thisMonth)}
          icon="📅"
          gradient="var(--gradient-blue)"
          subtitle="Current month spending"
        />
      </div>

      {/* ── Charts ── */}
      <div className="charts-grid">
        <MonthlyBarChart transactions={transactions} />
        <CategoryPieChart transactions={transactions} />
      </div>

      {/* ── Recent + Budget ── */}
      <div className="bottom-grid">
        <div className="card">
          <h3 className="section-title">🕑 Recent Transactions</h3>
          <RecentTransactions transactions={transactions} onNavigate={onNavigate} />
        </div>
        <BudgetCard budget={budget} transactions={transactions} onSetBudget={onSetBudget} />
      </div>
    </div>
  );
}
