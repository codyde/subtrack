export type Subscription = {
  id: string;
  name: string;
  amount: number;
  billingDate: Date;
  category: Category;
  description?: string;
  logo?: string;
  lastCharged?: Date;
  nextCharge?: Date;
  active?: boolean;
  paymentMethod?: string;
};

export type Category = 
  | 'entertainment'
  | 'productivity'
  | 'utilities'
  | 'shopping'
  | 'health'
  | 'other';

export type MonthlyOverview = {
  month: string;
  totalAmount: number;
  breakdown: {
    category: Category;
    amount: number;
  }[];
};