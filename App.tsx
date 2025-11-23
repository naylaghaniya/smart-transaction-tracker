import React, { useState, useEffect } from 'react';
import NewTransactionPage from './pages/NewTransactionPage';
import SummaryPage from './pages/SummaryPage';
import BudgetPage from './pages/BudgetPage';
import { BottomNav } from './components/BottomNav';
import { Transaction, Budget } from './types';
import NewBudgetModal from './components/NewBudgetModal';

const App: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        const savedTransactions = localStorage.getItem('transactions');
        return savedTransactions ? JSON.parse(savedTransactions) : [];
    });
    const [budgets, setBudgets] = useState<Budget[]>(() => {
        const savedBudgets = localStorage.getItem('budgets');
        return savedBudgets ? JSON.parse(savedBudgets) : [];
    });
    const [currentPage, setCurrentPage] = useState('summary');
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    const [isNewBudgetModalOpen, setIsNewBudgetModalOpen] = useState(false);


    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem('budgets', JSON.stringify(budgets));
    }, [budgets]);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const handleThemeToggle = () => {
        setIsDarkMode(prev => !prev);
    };

    const handleSaveTransaction = (transaction: Omit<Transaction, 'id'>) => {
        const newTransaction: Transaction = {
            ...transaction,
            id: new Date().toISOString() + Math.random().toString(),
        };
        setTransactions(prev => [newTransaction, ...prev]);
        setCurrentPage('summary'); // Navigate to summary after saving
    };

    const handleAddBudget = (newBudget: Budget) => {
        if (budgets.some(b => b.subcategory === newBudget.subcategory)) {
            alert(`A budget for "${newBudget.subcategory}" already exists.`);
            return;
        }
        setBudgets(prev => [...prev, newBudget]);
        setIsNewBudgetModalOpen(false);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'summary':
                return <SummaryPage transactions={transactions} isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />;
            case 'budget':
                return <BudgetPage 
                            transactions={transactions} 
                            budgets={budgets} 
                            isDarkMode={isDarkMode} 
                            onThemeToggle={handleThemeToggle} 
                            onAddNewBudget={() => setIsNewBudgetModalOpen(true)}
                        />;
            case 'new':
            default:
                return <NewTransactionPage onSave={handleSaveTransaction} isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />;
        }
    };

    return (
        <div className="h-screen flex flex-col bg-background-light dark:bg-background-dark font-sans">
            <div className="flex-grow overflow-y-auto">
                {renderPage()}
            </div>
            <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
            {isNewBudgetModalOpen && (
                <NewBudgetModal 
                    onClose={() => setIsNewBudgetModalOpen(false)} 
                    onSave={handleAddBudget} 
                />
            )}
        </div>
    );
};

export default App;
