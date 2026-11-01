// TransactionList.jsx — Filterable, sortable table of transactions with edit/delete.
// Props:
//   transactions — full array
//   onEdit(tx)    — called when user clicks Edit
//   onDelete(id)  — called when user confirms delete

import { useState } from 'react';
import { CATEGORIES, CATEGORY_COLORS } from '../utils/constants';
import { formatCurrency, sortTransactions } from '../utils/calculations';
import { MdEdit, MdDelete, MdSearch } from 'react-icons/md';

// Inline delete confirmation dialog
function DeleteModal({ tx, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>🗑️ Delete Transaction?</h3>
        <p>
          Are you sure you want to delete <strong>"{tx.title}"</strong>?
          This action cannot be undone.
        </p>
        <div className="modal-actions">
          <button className="btn btn-secondary btn-sm" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger btn-sm" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function TransactionList({ transactions, onEdit, onDelete }) {
  const [search, setSearch]         = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCat, setFilterCat]   = useState('all');
  const [sortField, setSortField]   = useState('date');
  const [sortDir, setSortDir]       = useState('desc');
  const [deletingTx, setDeletingTx] = useState(null);

  // Toggle sort: clicking the same column reverses direction
  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortField(field); setSortDir('desc'); }
  };

  // Apply search, type filter, category filter, then sort
  const filtered = sortTransactions(
    transactions.filter((tx) => {
      const matchSearch = tx.title.toLowerCase().includes(search.toLowerCase());
      const matchType   = filterType === 'all' || tx.type === filterType;
      const matchCat    = filterCat  === 'all' || tx.category === filterCat;
      return matchSearch && matchType && matchCat;
    }),
    sortField, sortDir
  );

  const confirmDelete = () => {
    if (deletingTx) { onDelete(deletingTx.id); setDeletingTx(null); }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <span className="sort-indicator">⇅</span>;
    return <span className="sort-indicator">{sortDir === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <>
      {deletingTx && (
        <DeleteModal
          tx={deletingTx}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingTx(null)}
        />
      )}

      <div className="card">
        {/* ── Filters ── */}
        <div className="tx-filters">
          {/* Search */}
          <div style={{ position: 'relative', flex: 1 }}>
            <MdSearch style={{
              position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)',
              color: 'var(--text-muted)', pointerEvents: 'none',
            }} size={17} />
            <input
              className="search-input"
              style={{ paddingLeft: 34, width: '100%' }}
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Type filter */}
          <select className="filter-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Category filter */}
          <select className="filter-select" value={filterCat} onChange={(e) => setFilterCat(e.target.value)}>
            <option value="all">All Categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Result count badge */}
          <span style={{
            fontSize: '0.78rem', color: 'var(--text-muted)',
            background: 'var(--bg-primary)', border: '1px solid var(--border)',
            borderRadius: 999, padding: '4px 12px', whiteSpace: 'nowrap',
          }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* ── Table ── */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <MdSearch size={52} />
            <h3>No transactions found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="tx-table-wrap">
            <table className="tx-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th onClick={() => handleSort('amount')} style={{ cursor: 'pointer' }}>
                    Amount <SortIcon field="amount" />
                  </th>
                  <th onClick={() => handleSort('date')} style={{ cursor: 'pointer' }}>
                    Date <SortIcon field="date" />
                  </th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((tx) => (
                  <tr key={tx.id}>
                    <td>
                      <div className="tx-title">{tx.title}</div>
                      {tx.notes && <div className="tx-notes">{tx.notes}</div>}
                    </td>
                    <td>
                      <span
                        className="category-badge"
                        style={{
                          background: (CATEGORY_COLORS[tx.category] || '#94a3b8') + '22',
                          color: CATEGORY_COLORS[tx.category] || '#94a3b8',
                        }}
                      >
                        {tx.category}
                      </span>
                    </td>
                    <td>
                      <span style={{
                        fontSize: '0.78rem', fontWeight: 600, padding: '3px 10px',
                        borderRadius: 999,
                        background: tx.type === 'income' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                        color: tx.type === 'income' ? 'var(--accent-green)' : 'var(--accent-red)',
                      }}>
                        {tx.type === 'income' ? '⬆ Income' : '⬇ Expense'}
                      </span>
                    </td>
                    <td className={tx.type === 'income' ? 'amount-income' : 'amount-expense'}>
                      {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                      {new Date(tx.date).toLocaleDateString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric',
                      })}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                        <button className="btn-icon edit" title="Edit" onClick={() => onEdit(tx)}>
                          <MdEdit size={17} />
                        </button>
                        <button className="btn-icon delete" title="Delete" onClick={() => setDeletingTx(tx)}>
                          <MdDelete size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
