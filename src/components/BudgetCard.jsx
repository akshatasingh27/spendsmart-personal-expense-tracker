// BudgetCard.jsx — Shows monthly budget, spent amount, remaining, and a progress bar.
// Props: budget (number), transactions (array), onSetBudget (function)

import { useState } from 'react';
import { formatCurrency, getCurrentMonthExpenses, getBudgetPercentage } from '../utils/calculations';
import { MdEdit, MdCheckCircle } from 'react-icons/md';

export default function BudgetCard({ budget, transactions, onSetBudget }) {
  const [editing, setEditing] = useState(false);
  const [inputVal, setInputVal] = useState(budget > 0 ? String(budget) : '');
  const [error, setError] = useState('');

  const spent = getCurrentMonthExpenses(transactions);
  const remaining = budget - spent;
  const percentage = getBudgetPercentage(spent, budget);

  // Colour changes as we approach or exceed budget
  const barColor =
    percentage >= 100 ? 'var(--accent-red)' :
    percentage >= 80  ? 'var(--accent-yellow)' :
    'var(--accent-green)';

  const handleSave = () => {
    const val = parseFloat(inputVal);
    if (isNaN(val) || val <= 0) {
      setError('Enter a valid positive amount');
      return;
    }
    onSetBudget(val);
    setEditing(false);
    setError('');
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <h3 className="section-title" style={{ marginBottom: 0 }}>🎯 Monthly Budget</h3>
        <button className="btn-icon edit" onClick={() => { setEditing(!editing); setInputVal(budget > 0 ? String(budget) : ''); }}>
          <MdEdit size={17} />
        </button>
      </div>

      {/* Budget edit form */}
      {editing && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="number"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="e.g. 30000"
              style={{
                flex: 1, background: 'var(--bg-primary)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)', padding: '9px 12px',
                color: 'var(--text-primary)', fontSize: '0.88rem',
              }}
              min="1"
            />
            <button className="btn btn-primary btn-sm" onClick={handleSave}>
              <MdCheckCircle size={14} /> Save
            </button>
          </div>
          {error && <p className="error-text" style={{ marginTop: 6 }}>{error}</p>}
        </div>
      )}

      {budget <= 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          No budget set. Click ✏️ to set a monthly budget.
        </p>
      ) : (
        <>
          {/* Stats row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <StatItem label="Budget"    value={formatCurrency(budget)}    color="var(--text-primary)" />
            <StatItem label="Spent"     value={formatCurrency(spent)}     color="var(--accent-red)" />
            <StatItem label="Remaining" value={formatCurrency(remaining)} color={remaining >= 0 ? 'var(--accent-green)' : 'var(--accent-red)'} />
          </div>

          {/* Progress bar */}
          <div className="progress-bar-wrap">
            <div
              className="progress-bar-fill"
              style={{ width: `${percentage}%`, background: barColor }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
            <span>0%</span>
            <span style={{ color: barColor, fontWeight: 600 }}>{percentage.toFixed(1)}% used</span>
            <span>100%</span>
          </div>

          {/* Warning messages */}
          {percentage >= 100 && (
            <div className="alert alert-error" style={{ marginTop: 12, marginBottom: 0 }}>
              ⚠️ Budget exceeded! You are over by {formatCurrency(spent - budget)}.
            </div>
          )}
          {percentage >= 80 && percentage < 100 && (
            <div className="alert alert-warning" style={{ marginTop: 12, marginBottom: 0 }}>
              ⚠️ You've used {percentage.toFixed(0)}% of your budget. Slow down!
            </div>
          )}
        </>
      )}
    </div>
  );
}

function StatItem({ label, value, color }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: '0.88rem', fontWeight: 700, color }}>{value}</div>
    </div>
  );
}
