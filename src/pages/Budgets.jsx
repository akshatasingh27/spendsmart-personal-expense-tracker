// Budgets.jsx — Dedicated budget management page.
// Receives: budget, transactions, onSetBudget

import { useState } from 'react';
import BudgetCard from '../components/BudgetCard';
import { formatCurrency, getCurrentMonthExpenses, getCategoryChartData, getBudgetPercentage } from '../utils/calculations';
import { CATEGORY_COLORS } from '../utils/constants';

export default function Budgets({ budget, transactions, onSetBudget }) {
  const spent     = getCurrentMonthExpenses(transactions);
  const remaining = budget - spent;
  const pct       = getBudgetPercentage(spent, budget);

  const catData = getCategoryChartData(transactions); // sorted by value desc

  return (
    <div>
      <div className="page-header">
        <h1>Budget Manager</h1>
        <p>Track your monthly spending limits and stay in control.</p>
      </div>

      {/* Main budget card */}
      <div style={{ maxWidth: 560, marginBottom: 24 }}>
        <BudgetCard budget={budget} transactions={transactions} onSetBudget={onSetBudget} />
      </div>

      {/* How-it-works tips */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h3 className="section-title">💡 Budget Tips</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {[
            { icon: '🎯', tip: 'Set a realistic monthly budget based on your past 3 months average spending.' },
            { icon: '📊', tip: 'The progress bar turns yellow at 80% and red at 100% to warn you early.' },
            { icon: '✏️', tip: "Click the pencil icon on the budget card to update your limit anytime." },
            { icon: '🗂️', tip: 'Track category-wise spending below to find where you can cut costs.' },
          ].map(({ icon, tip }) => (
            <div key={tip} style={{
              background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)',
              padding: '14px 16px', border: '1px solid var(--border)',
            }}>
              <div style={{ fontSize: '1.4rem', marginBottom: 8 }}>{icon}</div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Category spending this month */}
      <div className="card">
        <h3 className="section-title">🗂️ Category Spending (All Time)</h3>
        {catData.length === 0 ? (
          <div className="empty-state">
            <p>No expense data yet. Add some transactions first.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {catData.map((cat) => {
              const color = CATEGORY_COLORS[cat.name] || '#94a3b8';
              const catPct = budget > 0 ? Math.min((cat.value / budget) * 100, 100) : 0;
              return (
                <div key={cat.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{cat.name}</span>
                    <span style={{ fontSize: '0.85rem', color, fontWeight: 700 }}>{formatCurrency(cat.value)}</span>
                  </div>
                  <div className="progress-bar-wrap" style={{ height: 8 }}>
                    <div
                      className="progress-bar-fill"
                      style={{ width: budget > 0 ? `${catPct}%` : '0%', background: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
