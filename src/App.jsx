// App.jsx — Root component. Manages global state (transactions, budget, activePage).
//
// STATE LIVES HERE because multiple pages (Dashboard, Transactions, Budgets) all
// need to read and update the same transaction data. Lifting state to a common
// parent is a standard React pattern.

import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import { loadTransactions, saveTransactions, loadBudget, saveBudget } from './utils/storage';
import { DEMO_TRANSACTIONS } from './utils/constants';

export default function App() {
  // ── State ─────────────────────────────────────────────────────────
  // transactions: array of all income/expense objects
  const [transactions, setTransactions] = useState([]);
  // budget: single number — the user's monthly limit in ₹
  const [budget, setBudget]             = useState(0);
  // activePage: which page the sidebar is showing
  const [activePage, setActivePage]     = useState('dashboard');
  // demoLoaded: whether we've offered/shown demo data
  const [demoLoaded, setDemoLoaded]     = useState(false);

  // ── Load from localStorage on first render ────────────────────────
  // useEffect with [] runs ONCE when the component mounts (like componentDidMount).
  useEffect(() => {
    const saved = loadTransactions();
    const savedBudget = loadBudget();
    setBudget(savedBudget.monthly || 0);

    if (saved.length === 0) {
      // First visit — load demo data so the app isn't empty
      setTransactions(DEMO_TRANSACTIONS);
      saveTransactions(DEMO_TRANSACTIONS);
      setDemoLoaded(true);
    } else {
      setTransactions(saved);
    }
  }, []);

  // ── Save to localStorage whenever transactions change ─────────────
  // useEffect with [transactions] runs every time 'transactions' state changes.
  useEffect(() => {
    if (transactions.length > 0 || demoLoaded) {
      saveTransactions(transactions);
    }
  }, [transactions]);

  // ── Save budget whenever it changes ──────────────────────────────
  useEffect(() => {
    saveBudget({ monthly: budget });
  }, [budget]);

  // ── CRUD handlers ─────────────────────────────────────────────────

  // Add a new transaction to the array
  const handleAdd = (tx) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  // Replace the transaction with the same id (editing)
  const handleEdit = (updatedTx) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === updatedTx.id ? updatedTx : tx))
    );
  };

  // Remove a transaction by id
  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  // Reset demo: clear everything and reload demo data
  const handleReset = () => {
    setTransactions(DEMO_TRANSACTIONS);
    saveTransactions(DEMO_TRANSACTIONS);
    setBudget(30000);
    saveBudget({ monthly: 30000 });
  };

  // ── Render ────────────────────────────────────────────────────────
  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <main className="main-content">
        {/* Demo data banner */}
        {demoLoaded && (
          <div className="alert alert-warning" style={{ marginBottom: 20 }}>
            👋 Demo data loaded! Feel free to explore, or{' '}
            <button
              onClick={handleReset}
              style={{ background: 'none', border: 'none', color: 'var(--accent-yellow)', cursor: 'pointer', fontWeight: 700, textDecoration: 'underline' }}
            >
              reset demo data
            </button>{' '}
            anytime.
          </div>
        )}

        {/* Page router — simple conditional rendering */}
        {activePage === 'dashboard' && (
          <Dashboard
            transactions={transactions}
            budget={budget}
            onSetBudget={setBudget}
            onNavigate={setActivePage}
          />
        )}
        {activePage === 'transactions' && (
          <Transactions
            transactions={transactions}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        {activePage === 'budgets' && (
          <Budgets
            budget={budget}
            transactions={transactions}
            onSetBudget={setBudget}
          />
        )}
      </main>
    </div>
  );
}
