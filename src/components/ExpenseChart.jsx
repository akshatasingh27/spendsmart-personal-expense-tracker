// ExpenseChart.jsx — Two Recharts charts:
//   1. BarChart — monthly income vs expense comparison (last 6 months)
//   2. PieChart — current category breakdown

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { CATEGORY_COLORS } from '../utils/constants';
import { formatCurrency, getMonthlyChartData, getCategoryChartData } from '../utils/calculations';

// Custom Tooltip shown when hovering bars
function CustomBarTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)', padding: '10px 14px', fontSize: '0.8rem',
      }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 6 }}>{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color, fontWeight: 600 }}>
            {p.name === 'income' ? 'Income' : 'Expense'}: {formatCurrency(p.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

// Custom Tooltip for Pie
function CustomPieTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)', padding: '8px 12px', fontSize: '0.8rem',
      }}>
        <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{payload[0].name}</p>
        <p style={{ color: 'var(--text-secondary)' }}>{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
}

// MonthlyBarChart — shown in the wider left column
export function MonthlyBarChart({ transactions }) {
  const data = getMonthlyChartData(transactions);
  return (
    <div className="card" style={{ height: 300 }}>
      <h3 className="section-title">📊 Income vs Expenses (Last 6 Months)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="28%" barGap={4}>
          <XAxis
            dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
            axisLine={false} tickLine={false}
            tickFormatter={(v) => `₹${v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v}`}
          />
          <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="income"  name="income"  fill="var(--accent-green)"  radius={[4,4,0,0]} />
          <Bar dataKey="expense" name="expense" fill="var(--accent-red)"    radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', gap: 18, justifyContent: 'center', marginTop: 8 }}>
        <LegendDot color="var(--accent-green)" label="Income" />
        <LegendDot color="var(--accent-red)"   label="Expense" />
      </div>
    </div>
  );
}

// CategoryPieChart — shown in the narrower right column
export function CategoryPieChart({ transactions }) {
  const data = getCategoryChartData(transactions);

  if (data.length === 0) {
    return (
      <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h3 className="section-title">🍕 Category Breakdown</h3>
        <div className="empty-state">
          <p>No expense data yet</p>
        </div>
      </div>
    );
  }

  const COLORS = data.map((d) => CATEGORY_COLORS[d.name] || '#94a3b8');

  return (
    <div className="card">
      <h3 className="section-title">🍕 Category Breakdown</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={80}
            dataKey="value" paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip content={<CustomPieTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      {/* Small legend list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
        {data.slice(0, 5).map((d, i) => (
          <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS[i], flexShrink: 0 }} />
            <span style={{ flex: 1, color: 'var(--text-secondary)' }}>{d.name}</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{formatCurrency(d.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
      <span style={{ width: 10, height: 10, borderRadius: 2, background: color }} />
      {label}
    </div>
  );
}
