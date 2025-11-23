
import React, { useState } from 'react';
import { Budget, Category } from '../types';
import { SUBCATEGORIES } from '../constants';
import { FormInput } from './FormControls';

interface NewBudgetModalProps {
    onClose: () => void;
    onSave: (budget: Budget) => void;
}

const NewBudgetModal: React.FC<NewBudgetModalProps> = ({ onClose, onSave }) => {
    const [subcategory, setSubcategory] = useState(SUBCATEGORIES[Category.EXPENSE][0]);
    const [amount, setAmount] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const budgetedAmount = parseFloat(amount);
        if (!subcategory || isNaN(budgetedAmount) || budgetedAmount <= 0) {
            alert('Please select a valid category and enter a positive amount.');
            return;
        }
        onSave({ subcategory, budgeted: budgetedAmount });
    };

    return (
        <div className="modal-overlay animate-fade-in" onClick={onClose}>
            <div className="modal-content animate-scale-in" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-xl font-bold text-center text-black dark:text-white">Create New Budget</h2>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-black/70 dark:text-white/70">Category</label>
                        <select
                            value={subcategory}
                            onChange={(e) => setSubcategory(e.target.value)}
                            className="form-select appearance-none w-full h-12 px-4 rounded-lg bg-white/50 dark:bg-black/20 border border-primary/30 dark:border-primary/40 text-black dark:text-white focus:ring-primary focus:border-primary"
                        >
                            {SUBCATEGORIES[Category.EXPENSE].map(sub => <option key={sub} value={sub}>{sub}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                         <label className="text-sm font-medium text-black/70 dark:text-white/70">Budget Amount</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">Rp</span>
                            <input
                                type="number"
                                placeholder="0"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full h-12 pl-11 pr-4 text-left rounded-lg bg-white/50 dark:bg-black/20 border border-primary/30 dark:border-primary/40 text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 focus:ring-primary focus:border-primary"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button type="button" onClick={onClose} className="w-full h-12 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-bold text-base">Cancel</button>
                        <button type="submit" className="w-full h-12 rounded-lg bg-primary text-black font-bold text-base">Save Budget</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewBudgetModal;