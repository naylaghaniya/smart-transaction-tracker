import React, { useState, useCallback } from 'react';
import { Category, FundSource, Transaction, TransactionType } from '../types';
import { SUBCATEGORIES } from '../constants';
import { categorizeTransaction } from '../services/geminiService';
import { Header } from '../components/Header';
import { AmountInput, DateInput, DescriptionInput, SelectInput, TextAreaInput } from '../components/FormControls';
import { Footer } from '../components/Footer';

interface NewTransactionPageProps {
    onSave: (transaction: Omit<Transaction, 'id'>) => void;
    isDarkMode: boolean;
    onThemeToggle: () => void;
}


const NewTransactionPage: React.FC<NewTransactionPageProps> = ({ onSave, isDarkMode, onThemeToggle }) => {
  const [transaction, setTransaction] = useState<Omit<Transaction, 'id'>>({
    date: new Date().toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-'),
    description: '',
    category: Category.EXPENSE,
    subcategory: SUBCATEGORIES[Category.EXPENSE][0],
    type: TransactionType.ONE_TIME,
    amount: '',
    source: FundSource.BANK,
    notes: '',
  });
  const [isCategorizing, setIsCategorizing] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setTransaction(prev => {
        const updated = { ...prev, [name]: value };
        if (name === 'category') {
            const newCategory = value as Category;
            const newSubcategories = SUBCATEGORIES[newCategory];
            updated.subcategory = newSubcategories.length > 0 ? newSubcategories[0] : '';
        }
        return updated;
    });
  };
  
  const handleAutoCategorize = useCallback(async () => {
    if (!transaction.description.trim()) {
      alert("Please enter a description first.");
      return;
    }
    setIsCategorizing(true);
    try {
      const { category, subcategory } = await categorizeTransaction(transaction.description);
      
      setTransaction(prev => {
          const newSubcategories = [...(SUBCATEGORIES[category] || [])];
          if (!newSubcategories.includes(subcategory)) {
              newSubcategories.push(subcategory); 
          }

          return {
              ...prev,
              category,
              subcategory,
          };
      });

    } catch (error) {
      alert(error instanceof Error ? error.message : 'An unknown error occurred.');
    } finally {
      setIsCategorizing(false);
    }
  }, [transaction.description]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transaction.description || !transaction.amount) {
        alert("Please fill in at least the description and amount.");
        return;
    }
    onSave(transaction);
  };

  return (
    <>
      <Header
        title="New Transaction"
        rightButton={
            <button onClick={onThemeToggle} className="text-black dark:text-white w-8 h-8 flex items-center justify-center">
                <span className="material-symbols-outlined"> {isDarkMode ? 'light_mode' : 'dark_mode'} </span>
            </button>
        }
       />
      <main className="p-4 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DateInput
            value={transaction.date}
            onChange={handleInputChange}
          />
          <DescriptionInput
            value={transaction.description}
            onChange={handleInputChange}
            onAutoCategorize={handleAutoCategorize}
            isCategorizing={isCategorizing}
          />

          <div className="grid grid-cols-2 gap-4">
            <SelectInput
              label="Category"
              name="category"
              value={transaction.category}
              onChange={handleInputChange}
              options={Object.values(Category)}
            />
            <SelectInput
              label="Subcategory"
              name="subcategory"
              value={transaction.subcategory}
              onChange={handleInputChange}
              options={SUBCATEGORIES[transaction.category]}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SelectInput
              label="Type"
              name="type"
              value={transaction.type}
              onChange={handleInputChange}
              options={Object.values(TransactionType)}
            />
            <AmountInput
              value={transaction.amount}
              onChange={handleInputChange}
            />
          </div>

          <SelectInput
            label="Source of Funds"
            name="source"
            value={transaction.source}
            onChange={handleInputChange}
            options={Object.values(FundSource)}
          />
          
          <TextAreaInput
            label="Notes"
            name="notes"
            value={transaction.notes}
            onChange={handleInputChange}
            placeholder="Add a note..."
            rows={3}
          />
        </form>
      </main>
      <Footer onSave={handleSubmit} />
    </>
  );
};

export default NewTransactionPage;
