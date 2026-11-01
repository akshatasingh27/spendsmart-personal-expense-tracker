// Transactions.jsx — Full transactions management page.
// Receives: transactions, onAdd, onEdit, onDelete

import { useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { formatCurrency, getTotalIncome, getTotalExpenses } from '../utils/calculations';
import { MdAdd, MdClose } from 'react-icons/md';

export default function Transactions({ transactions, onAdd, onEdit, onDelete }) {
  const [showForm, setShowForm]       = useState(false);
  const [editingTx, setEditingTx]     = useState(null);

  // Called from TransactionList when the user clicks the Edit button
  const handleEdit = (tx) => {
    setEditingTx(tx);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Called when form is submitted
  const handleSubmit = (tx) => {
    if (editingTx) {
      onEdit(tx);        // update existing
    } else {
      onAdd(tx);         // add new
    }
    setShowForm(false);
    setEditingTx(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTx(null);
  };

  const income   = getTotalIncome(transactions);
  const expenses = getTotalExpenses(transactions);

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Transactions</h1>
          <p>Manage all your income and expenses in one place.</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setShowForm(true); setEditingTx(null); }}>
          <MdAdd size={17} /> Add Transaction
        </button>
      </div>

      {/* Mini stat bar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Transactions', value: transactions.length, color: 'var(--accent-indigo)' },
          { label: 'Total Income',       value: formatCurrency(income),   color: 'var(--accent-green)' },
          { label: 'Total Expenses',     value: formatCurrency(expenses),  color: 'var(--accent-red)' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card" style={{ flex: 1, minWidth: 160, padding: '14px 18px' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase' }}>{label}</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Add/Edit form (shown conditionally) */}
      {showForm && (
        <div style={{ marginBottom: 24 }}>
          <TransactionForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            initialData={editingTx}
          />
        </div>
      )}

      {/* Transaction table */}
      <TransactionList
        transactions={transactions}
        onEdit={handleEdit}
        onDelete={onDelete}
      />
    </div>
  );
}
