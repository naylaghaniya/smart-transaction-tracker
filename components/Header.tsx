import React from 'react';

interface HeaderProps {
    title: string;
    leftButton?: React.ReactNode;
    rightButton?: React.ReactNode;
    children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, leftButton, rightButton, children }) => {
    return (
        <header className="sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm z-10">
            <div className="flex items-center justify-between p-4 border-b border-primary/20 dark:border-primary/30 shrink-0">
                <div className="w-10">
                    {leftButton}
                </div>
                <h1 className="text-lg font-bold text-black dark:text-white">{title}</h1>
                <div className="w-10 flex justify-end">
                    {rightButton}
                </div>
            </div>
             {children && <div className="border-b border-gray-200 dark:border-gray-800">{children}</div>}
        </header>
    );
};