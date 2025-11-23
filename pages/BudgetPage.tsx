
import React from 'react';
import { Header } from '../components/Header';
import { BudgetItem } from '../components/BudgetItem';
import { Category, Transaction, Budget } from '../types';

interface BudgetPageProps {
    transactions: Transaction[];
    budgets: Budget[];
    isDarkMode: boolean;
    onThemeToggle: () => void;
    onAddNewBudget: () => void;
}

const BudgetPage: React.FC<BudgetPageProps> = ({ transactions, budgets, isDarkMode, onThemeToggle, onAddNewBudget }) => {
    
    const calculateSpent = (subcategory: string): number => {
        return transactions
            .filter(t => t.category === Category.EXPENSE && t.subcategory === subcategory)
            .reduce((sum, t) => sum + parseFloat(t.amount || '0'), 0);
    };

    const budgetItems = budgets.map(budget => ({
        ...budget,
        spent: calculateSpent(budget.subcategory),
    }));

    const totalBudgeted = budgetItems.reduce((sum, b) => sum + b.budgeted, 0);
    const totalSpent = budgetItems.reduce((sum, b) => sum + b.spent, 0);
    const totalRemaining = totalBudgeted - totalSpent;

    return (
        <div className="flex flex-col h-full">
            <Header
                title="Your Budget"
                rightButton={
                    <button onClick={onThemeToggle} className="text-black dark:text-white w-8 h-8 flex items-center justify-center">
                        <span className="material-symbols-outlined"> {isDarkMode ? 'light_mode' : 'dark_mode'} </span>
                    </button>
                }
            />
            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                {budgets.length > 0 ? (
                    <>
                        <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-lg text-center">
                            <p className="text-sm text-black/70 dark:text-white/70">Total Budget Remaining</p>
                            <p className={`text-3xl font-bold ${totalRemaining < 0 ? 'text-red-500' : 'text-black dark:text-white'}`}>
                                Rp{new Intl.NumberFormat('id-ID').format(totalRemaining)}
                            </p>
                        </div>
                        <div className="space-y-2">
                            {budgetItems.map((budget) => (
                                <BudgetItem key={budget.subcategory} {...budget} category={Category.EXPENSE} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-black/60 dark:text-white/60 mb-2">No budget plans yet.</p>
                        <p className="text-black/60 dark:text-white/60">Create one to start tracking your spending!</p>
                    </div>
                )}
            </main>
             <footer className="p-4 border-t border-primary/20 dark:border-primary/30 shrink-0">
                <button 
                    onClick={onAddNewBudget}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-base font-bold text-background-dark hover:bg-opacity-90 transition-colors"
                >
                    <span className="material-symbols-outlined">add</span>
                    <span>New Budget</span>
                </button>
            </footer>
        </div>
    );
};

export default BudgetPage;