import React from 'react';
import { Transaction, Category } from '../types';
import { Header } from '../components/Header';
import { getCategoryIcon } from '../components/CategoryIcons';

interface SummaryPageProps {
    transactions: Transaction[];
    isDarkMode: boolean;
    onThemeToggle: () => void;
}

interface TransactionItemProps {
    transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
    const amountColor =
        transaction.category === Category.EXPENSE ? 'text-red-500' :
        transaction.category === Category.INCOME ? 'text-green-600 dark:text-green-400' :
        'text-blue-500';

    const amountSign = transaction.category === Category.EXPENSE ? '-' : '+';

    return (
        <div className="flex items-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary mr-3">
                <span className="material-symbols-outlined text-xl">{getCategoryIcon(transaction.category, transaction.subcategory)}</span>
            </div>
            <div className="flex-1">
                <p className="font-semibold text-black dark:text-white">{transaction.description}</p>
                <p className="text-sm text-black/60 dark:text-white/60">{transaction.subcategory}</p>
            </div>
            <div className="text-right">
                <p className={`font-bold ${amountColor}`}>{amountSign}Rp{new Intl.NumberFormat('id-ID').format(parseFloat(transaction.amount))}</p>
            </div>
        </div>
    );
};


const SummaryPage: React.FC<SummaryPageProps> = ({ transactions, isDarkMode, onThemeToggle }) => {
    
    const totals = transactions.reduce((acc, t) => {
        const amount = parseFloat(t.amount || '0');
        if (t.category === Category.INCOME) {
            acc.income += amount;
        } else if (t.category === Category.EXPENSE) {
            acc.expense += amount;
        } else if (t.category === Category.SAVINGS) {
            acc.savings += amount;
        }
        return acc;
    }, { income: 0, expense: 0, savings: 0 });

    const netBalance = totals.income - totals.expense;

    const groupedTransactions = transactions.reduce<Record<string, Transaction[]>>((acc, t) => {
        const dateKey = t.date;
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(t);
        return acc;
    }, {});

    const sortedDates = Object.keys(groupedTransactions).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <div className="flex flex-col h-full">
            <Header
                title="Summary"
                rightButton={
                    <button onClick={onThemeToggle} className="text-black dark:text-white w-8 h-8 flex items-center justify-center">
                        <span className="material-symbols-outlined"> {isDarkMode ? 'light_mode' : 'dark_mode'} </span>
                    </button>
                }
            />
             <main className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg text-center">
                    <p className="text-sm text-black/70 dark:text-white/70">Net Balance</p>
                    <p className={`text-2xl font-bold ${netBalance < 0 ? 'text-red-500' : 'text-black dark:text-white'}`}>
                        Rp{new Intl.NumberFormat('id-ID').format(netBalance)}
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-green-500/10 dark:bg-green-500/20 rounded-lg">
                        <p className="text-xs text-black/70 dark:text-white/70">Income</p>
                        <p className="font-bold text-green-600 dark:text-green-400">Rp{new Intl.NumberFormat('id-ID').format(totals.income)}</p>
                    </div>
                    <div className="p-2 bg-red-500/10 dark:bg-red-500/20 rounded-lg">
                        <p className="text-xs text-black/70 dark:text-white/70">Expense</p>
                        <p className="font-bold text-red-500">Rp{new Intl.NumberFormat('id-ID').format(totals.expense)}</p>
                    </div>
                    <div className="p-2 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg">
                        <p className="text-xs text-black/70 dark:text-white/70">Savings</p>
                        <p className="font-bold text-blue-500">Rp{new Intl.NumberFormat('id-ID').format(totals.savings)}</p>
                    </div>
                </div>


                {transactions.length > 0 ? (
                     <div className="space-y-4 pt-4">
                        <h2 className="text-lg font-semibold text-black dark:text-white">Recent Transactions</h2>
                        {sortedDates.map(date => (
                            <div key={date}>
                                <h3 className="text-sm font-medium text-black/60 dark:text-white/60 mb-2">{formatDate(date)}</h3>
                                <div className="space-y-2">
                                    {groupedTransactions[date].map(transaction => (
                                        <TransactionItem key={transaction.id} transaction={transaction} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-black/60 dark:text-white/60">No transactions yet.</p>
                        <p className="text-black/60 dark:text-white/60">Add one to get started!</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default SummaryPage;
