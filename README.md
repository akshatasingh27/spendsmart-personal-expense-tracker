# 💰 SpendSmart — Personal Expense Tracker

A modern, professional Personal Finance Tracker built with **React + Vite**. Track your income, expenses, and budget in a beautiful dark-themed dashboard.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Dashboard** | Balance, income, expenses, monthly stats, charts, recent transactions |
| **Transactions** | Add, edit, delete, search, filter by type/category, sort by date/amount |
| **Budget Manager** | Set monthly budget, progress bar, warnings at 80% and 100% |
| **Charts** | Bar chart (6-month trend), Pie chart (category breakdown) — powered by Recharts |
| **Persistence** | All data saved in `localStorage` — survives page refresh |
| **Demo Data** | Preloaded on first visit to showcase the app |
| **Responsive** | Works on desktop, tablet, and mobile |
| **INR Formatting** | All amounts displayed in Indian Rupees (₹) |

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | UI component library |
| Vite 8 | Fast build tool and dev server |
| Recharts | Charting library (BarChart, PieChart) |
| React Icons | Icon set (Material Design icons) |
| localStorage | Browser-based data persistence |
| CSS Variables | Design token system for consistent theming |

---

## 📁 Project Structure

```
expense-tracker/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── SummaryCard.jsx
│   │   ├── TransactionForm.jsx
│   │   ├── TransactionList.jsx
│   │   ├── ExpenseChart.jsx
│   │   └── BudgetCard.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Transactions.jsx
│   │   └── Budgets.jsx
│   ├── utils/
│   │   ├── calculations.js
│   │   ├── storage.js
│   │   └── constants.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or newer
- npm (comes with Node.js)

### Installation and Run

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/expense-tracker.git

# 2. Move into the project folder
cd expense-tracker

# 3. Install all dependencies
npm install

# 4. Start the development server
npm run dev
```

Open your browser at http://localhost:5173

### Other Commands

```bash
npm run build    # Create production-ready build in /dist
npm run preview  # Preview the production build locally
```

---

## 📦 Deployment on Vercel

1. Push code to a GitHub repository.
2. Go to vercel.com and click Add New Project.
3. Import your GitHub repository.
4. Vercel auto-detects Vite. Click Deploy.
5. Your site is live in about 1 minute!

---

## 🐙 GitHub Setup

```bash
git init
git add .
git commit -m "Initial commit: SpendSmart expense tracker"
git remote add origin https://github.com/YOUR_USERNAME/expense-tracker.git
git branch -M main
git push -u origin main
```

---

## 📚 Key Concepts Used

- useState — Stores data that can change (transactions list, budget amount, active page).
- useEffect — Runs code when something changes (loads from localStorage on mount, saves on change).
- Props — Parent components pass data down to child components.
- Lifting State Up — App.jsx holds all shared state and passes handlers down as props.
- localStorage — Browser storage that persists data across sessions.
- Recharts — Declarative chart components that accept data as props.

---

Made for Full Stack Development II College Project — 2026
