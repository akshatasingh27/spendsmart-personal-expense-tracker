// TransactionForm.jsx — The "Add / Edit Transaction" form.
// Props:
//   onSubmit(transactionObject) — called when form is valid and submitted
//   onCancel() — called when user clicks Cancel
//   initialData — if provided, pre-fills the form for editing

import { useState, useEffect } from 'react';
import { CATEGORIES } from '../utils/constants';
import { MdCheckCircle, MdCancel } from 'react-icons/md';

const EMPTY_FORM = {
  title: '',
  amount: '',
  category: 'Food',
  date: new Date().toISOString().split('T')[0],
  type: 'expense',
  notes: '',
};

export default function TransactionForm({ onSubmit, onCancel, initialData }) {
  const [form, setForm] = useState(initialData || EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // When editing, load existing data into the form
  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const isEditing = Boolean(initialData?.id);

  // Update a single field in the form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error for that field when user types
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Validate all required fields
  const validate = () => {
    const errs = {};
    if (!form.title.trim())         errs.title    = 'Title is required';
    if (!form.amount || Number(form.amount) <= 0) errs.amount = 'Enter a valid amount greater than ₹0';
    if (!form.date)                 errs.date     = 'Date is required';
    if (!form.category)             errs.category = 'Select a category';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    // Build the transaction object
    const tx = {
      ...form,
      amount: parseFloat(form.amount),
      id: initialData?.id || `tx_${Date.now()}`,
    };
    onSubmit(tx);
    if (!isEditing) {
      setForm(EMPTY_FORM);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    }
  };

  return (
    <div className="card">
      <h3 className="section-title">
        {isEditing ? '✏️ Edit Transaction' : '➕ Add Transaction'}
      </h3>

      {success && (
        <div className="alert alert-success">
          <MdCheckCircle /> Transaction added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Income / Expense toggle */}
        <div className="type-toggle">
          <button
            type="button"
            className={`type-btn income ${form.type === 'income' ? 'active' : ''}`}
            onClick={() => setForm((p) => ({ ...p, type: 'income' }))}
          >
            ⬆️ Income
          </button>
          <button
            type="button"
            className={`type-btn expense ${form.type === 'expense' ? 'active' : ''}`}
            onClick={() => setForm((p) => ({ ...p, type: 'expense' }))}
          >
            ⬇️ Expense
          </button>
        </div>

        <div className="form-grid">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Transaction Title *</label>
            <input
              id="title" name="title" type="text"
              value={form.title} onChange={handleChange}
              placeholder="e.g. Grocery Shopping"
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          {/* Amount */}
          <div className="form-group">
            <label htmlFor="amount">Amount (₹) *</label>
            <input
              id="amount" name="amount" type="number"
              value={form.amount} onChange={handleChange}
              placeholder="e.g. 1500"
              min="1" step="0.01"
              className={errors.amount ? 'error' : ''}
            />
            {errors.amount && <span className="error-text">{errors.amount}</span>}
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category" name="category"
              value={form.category} onChange={handleChange}
              className={errors.category ? 'error' : ''}
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <span className="error-text">{errors.category}</span>}
          </div>

          {/* Date */}
          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              id="date" name="date" type="date"
              value={form.date} onChange={handleChange}
              className={errors.date ? 'error' : ''}
            />
            {errors.date && <span className="error-text">{errors.date}</span>}
          </div>

          {/* Notes */}
          <div className="form-group full-width">
            <label htmlFor="notes">Notes (optional)</label>
            <textarea
              id="notes" name="notes"
              value={form.notes} onChange={handleChange}
              placeholder="Any additional details..."
            />
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          <button type="submit" className="btn btn-primary">
            <MdCheckCircle size={16} />
            {isEditing ? 'Update Transaction' : 'Add Transaction'}
          </button>
          {(isEditing || onCancel) && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              <MdCancel size={16} /> Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
