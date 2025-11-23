
import React from 'react';

interface FooterProps {
    onSave: (e: React.FormEvent) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSave }) => {
    return (
        <footer className="p-4 border-t border-primary/20 dark:border-primary/30 shrink-0">
            <button
                type="submit"
                onClick={onSave}
                className="w-full h-12 rounded-lg bg-primary text-black font-bold text-base hover:bg-opacity-90 transition-colors"
            >
                Save Transaction
            </button>
        </footer>
    );
};
