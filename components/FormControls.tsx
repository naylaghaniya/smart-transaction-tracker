
import React from 'react';

const baseInputClasses = "w-full h-12 px-4 rounded-lg bg-white/50 dark:bg-black/20 border border-primary/30 dark:border-primary/40 text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 focus:ring-primary focus:border-primary";

interface FormGroupProps {
    label: string;
    children: React.ReactNode;
}

const FormGroup: React.FC<FormGroupProps> = ({ label, children }) => (
    <div className="space-y-2">
        <label className="text-sm font-medium text-black/70 dark:text-white/70">{label}</label>
        {children}
    </div>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const FormInput: React.FC<InputProps> = ({ label, ...props }) => (
    <FormGroup label={label}>
        <input className={baseInputClasses} {...props} />
    </FormGroup>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: string[];
}

export const SelectInput: React.FC<SelectProps> = ({ label, options, ...props }) => (
    <FormGroup label={label}>
        <select className={`form-select appearance-none ${baseInputClasses}`} {...props}>
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
    </FormGroup>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

export const TextAreaInput: React.FC<TextAreaProps> = ({ label, ...props }) => (
    <FormGroup label={label}>
        <textarea className={`w-full p-4 rounded-lg bg-white/50 dark:bg-black/20 border border-primary/30 dark:border-primary/40 text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 focus:ring-primary focus:border-primary`} {...props}></textarea>
    </FormGroup>
);


interface AmountInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AmountInput: React.FC<AmountInputProps> = ({ value, onChange }) => (
    <FormGroup label="Amount">
        <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">Rp</span>
            <input
                name="amount"
                type="number"
                placeholder="0"
                value={value}
                onChange={onChange}
                className={`${baseInputClasses} pl-11 pr-4 text-right`}
            />
        </div>
    </FormGroup>
);


interface DateInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DateInput: React.FC<DateInputProps> = ({ value, onChange }) => (
    <FormGroup label="Date">
        <div className="relative">
            <input
                name="date"
                type="text"
                value={value}
                onChange={onChange}
                className={`${baseInputClasses} pr-12`}
            />
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none"> calendar_today </span>
        </div>
    </FormGroup>
);

interface DescriptionInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAutoCategorize: () => void;
    isCategorizing: boolean;
}

export const DescriptionInput: React.FC<DescriptionInputProps> = ({ value, onChange, onAutoCategorize, isCategorizing }) => (
    <FormGroup label="Description">
        <div className="relative">
            <input
                name="description"
                type="text"
                placeholder="e.g., Groceries"
                value={value}
                onChange={onChange}
                className={`${baseInputClasses} pr-28`}
            />
            <button
                type="button"
                onClick={onAutoCategorize}
                disabled={isCategorizing}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-9 px-3 rounded-md bg-primary/20 dark:bg-primary/30 text-primary font-semibold text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-wait"
            >
                {isCategorizing ? (
                    <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <>
                        <span className="material-symbols-outlined text-base mr-1">auto_awesome</span>
                        Categorize
                    </>
                )}
            </button>
        </div>
    </FormGroup>
);