import React from 'react';

interface BottomNavProps {
    currentPage: string;
    onNavigate: (page: string) => void;
}

const NavItem: React.FC<{ icon: string; label: string; isActive: boolean; onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors ${isActive ? 'text-primary' : 'text-black/50 dark:text-white/50'}`}>
        <span className="material-symbols-outlined text-2xl">{icon}</span>
        <span className="text-xs font-medium">{label}</span>
    </button>
);

export const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
    return (
        <nav className="flex items-center justify-around bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-t border-primary/20 dark:border-primary/30 shrink-0">
            <NavItem
                icon="receipt_long"
                label="Summary"
                isActive={currentPage === 'summary'}
                onClick={() => onNavigate('summary')}
            />
            <NavItem
                icon="add_circle"
                label="New"
                isActive={currentPage === 'new'}
                onClick={() => onNavigate('new')}
            />
            <NavItem
                icon="monitoring"
                label="Budget"
                isActive={currentPage === 'budget'}
                onClick={() => onNavigate('budget')}
            />
        </nav>
    );
};
