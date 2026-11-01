// SummaryCard.jsx — A single statistics card on the dashboard.
// Props: title, value, icon, gradient, subtitle, trend

export default function SummaryCard({ title, value, icon, gradient, subtitle, trend }) {
  return (
    <div className="card summary-card" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Decorative circle in background */}
      <div style={{
        position: 'absolute', top: -20, right: -20,
        width: 90, height: 90, borderRadius: '50%',
        background: gradient, opacity: 0.1,
      }} />

      {/* Icon */}
      <div style={{
        width: 44, height: 44, borderRadius: 'var(--radius-md)',
        background: gradient, display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '1.3rem', marginBottom: 14,
      }}>
        {icon}
      </div>

      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase',
        letterSpacing: '0.5px', fontWeight: 600, marginBottom: 6 }}>
        {title}
      </div>

      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
        {value}
      </div>

      {subtitle && (
        <div style={{ marginTop: 8, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {subtitle}
        </div>
      )}

      {trend !== undefined && (
        <div style={{
          marginTop: 6, fontSize: '0.78rem',
          color: trend >= 0 ? 'var(--accent-green)' : 'var(--accent-red)',
          fontWeight: 600,
        }}>
          {trend >= 0 ? '▲' : '▼'} {Math.abs(trend).toFixed(1)}% vs last month
        </div>
      )}
    </div>
  );
}
