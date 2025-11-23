
import React from 'react';
import { Category } from '../types';
import { getCategoryIcon } from './CategoryIcons';

interface BudgetItemProps {
    category: Category;
    subcategory: string;
    budgeted: number;
    spent: number;
}

const getStatus = (spent: number, budgeted: number): { text: string; className: string } => {
    if (budgeted === 0) return { text: 'Safe', className: 'safe' };
    const percentage = spent / budgeted;
    if (percentage >= 1) {
        return { text: 'Over Budget', className: 'over-budget' };
    }
    if (percentage >= 0.8) {
        return { text: 'Nearly Full', className: 'nearly-full' };
    }
    return { text: 'Safe', className: 'safe' };
};


export const BudgetItem: React.FC<BudgetItemProps> = ({ category, subcategory, budgeted, spent }) => {
    const percentage = budgeted > 0 ? Math.min((spent / budgeted) * 100, 100) : 0;
    const remaining = budgeted - spent;
    const isOverBudget = remaining < 0;
    const status = getStatus(spent, budgeted);

    return (
        <div className="rounded-xl bg-white dark:bg-gray-800/50 p-4">
            <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <span className="material-symbols-outlined">{getCategoryIcon(category, subcategory)}</span>
                </div>
                <div className="flex-1">
                    <div className="flex justify-between">
                        <p className="font-semibold text-gray-900 dark:text-white">{subcategory}</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            <span className={isOverBudget ? 'text-red-500' : ''}>Rp{new Intl.NumberFormat('id-ID').format(spent)}</span> / Rp{new Intl.NumberFormat('id-ID').format(budgeted)}
                        </p>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div className={`h-2 rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-primary'}`} style={{ width: `${percentage}%` }}></div>
                    </div>
                </div>
                <div className={`rounded-full px-2 py-1 text-xs font-semibold ${status.className} hidden @sm:block`}>
                    {status.text}
                </div>
            </div>
        </div>
    );
};