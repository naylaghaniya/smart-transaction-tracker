import { Category } from '../types';

export const getCategoryIcon = (category: Category, subcategory: string): string => {
    switch (category) {
        case Category.EXPENSE:
            switch (subcategory.toLowerCase()) {
                case 'food': return 'restaurant';
                case 'transport': return 'commute';
                case 'utilities': return 'lightbulb';
                case 'shopping': return 'shopping_bag';
                case 'entertainment': return 'theaters';
                case 'health': return 'health_and_safety';
                case 'housing': return 'home';
                default: return 'receipt';
            }
        case Category.INCOME:
            switch (subcategory.toLowerCase()) {
                case 'salary': return 'work';
                case 'freelance': return 'laptop_mac';
                case 'investment': return 'trending_up';
                case 'gift': return 'card_giftcard';
                default: return 'attach_money';
            }
        case Category.SAVINGS:
            switch (subcategory.toLowerCase()) {
                case 'deposit': return 'savings';
                case 'investment contribution': return 'account_balance';
                default: return 'piggy_bank';
            }
        default:
            return 'help_outline';
    }
};
