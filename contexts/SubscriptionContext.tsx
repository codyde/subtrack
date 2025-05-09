import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Subscription, Category } from '@/types/subscription';

// Define the shape of the subscription context
type SubscriptionContextType = {
  subscriptions: Subscription[];
  addSubscription: (subscription: Omit<Subscription, 'id'>) => void;
  updateSubscription: (id: string, subscription: Partial<Subscription>) => void;
  deleteSubscription: (id: string) => void;
  getSubscriptionById: (id: string) => Subscription | undefined;
  getMonthlyTotal: () => number;
  getCategoryTotal: (category: Category) => number;
  initializeUserData: (email: string) => void;
};

// Create the context with a default value
const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

// Sample data for demonstration
const sampleSubscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    amount: 15.99,
    billingDate: new Date(2023, 5, 15),
    category: 'entertainment',
    logo: 'https://example.com/netflix-logo.png',
    active: true,
    paymentMethod: 'Visa •••• 4321',
    nextCharge: new Date(2023, 6, 15),
  },
  {
    id: '2',
    name: 'Spotify',
    amount: 9.99,
    billingDate: new Date(2023, 5, 20),
    category: 'entertainment',
    logo: 'https://example.com/spotify-logo.png',
    active: true,
    paymentMethod: 'Mastercard •••• 8765',
    nextCharge: new Date(2023, 6, 20),
  },
  {
    id: '3',
    name: 'Adobe Creative Cloud',
    amount: 52.99,
    billingDate: new Date(2023, 5, 5),
    category: 'productivity',
    logo: 'https://example.com/adobe-logo.png',
    active: true,
    paymentMethod: 'Visa •••• 4321',
    nextCharge: new Date(2023, 6, 5),
  },
  {
    id: '4',
    name: 'iCloud Storage',
    amount: 2.99,
    billingDate: new Date(2023, 5, 7),
    category: 'utilities',
    logo: 'https://example.com/icloud-logo.png',
    active: true,
    paymentMethod: 'Apple Pay',
    nextCharge: new Date(2023, 6, 7),
  },
  {
    id: '5',
    name: 'Amazon Prime',
    amount: 14.99,
    billingDate: new Date(2023, 5, 10),
    category: 'shopping',
    logo: 'https://example.com/amazon-logo.png',
    active: true,
    paymentMethod: 'Visa •••• 4321',
    nextCharge: new Date(2023, 6, 10),
  },
  {
    id: '6',
    name: 'Fitness App',
    amount: 9.99,
    billingDate: new Date(2023, 5, 3),
    category: 'health',
    logo: 'https://example.com/fitness-logo.png',
    active: true,
    paymentMethod: 'PayPal',
    nextCharge: new Date(2023, 6, 3),
  }
];

// Provider component
export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  // Initialize user data based on email
  const initializeUserData = (email: string) => {
    if (email === 'demo@subtrack.com') {
      setSubscriptions(sampleSubscriptions);
    } else {
      setSubscriptions([]);
    }
  };

  // Add a new subscription
  const addSubscription = (subscription: Omit<Subscription, 'id'>) => {
    const newSubscription = {
      ...subscription,
      id: Math.random().toString(36).substring(2, 9), // Generate a random ID
      active: true
    };
    setSubscriptions([...subscriptions, newSubscription as Subscription]);
  };

  // Update an existing subscription
  const updateSubscription = (id: string, updatedData: Partial<Subscription>) => {
    setSubscriptions(
      subscriptions.map(subscription => 
        subscription.id === id 
          ? { ...subscription, ...updatedData } 
          : subscription
      )
    );
  };

  // Delete a subscription
  const deleteSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter(subscription => subscription.id !== id));
  };

  // Get a subscription by ID
  const getSubscriptionById = (id: string) => {
    return subscriptions.find(subscription => subscription.id === id);
  };

  // Get total monthly subscription cost
  const getMonthlyTotal = () => {
    return subscriptions.reduce((total, subscription) => 
      subscription.active ? total + subscription.amount : total, 0);
  };

  // Get total cost for a specific category
  const getCategoryTotal = (category: Category) => {
    return subscriptions
      .filter(subscription => subscription.category === category && subscription.active)
      .reduce((total, subscription) => total + subscription.amount, 0);
  };

  const value = {
    subscriptions,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    getSubscriptionById,
    getMonthlyTotal,
    getCategoryTotal,
    initializeUserData
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

// Custom hook to use the subscription context
export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}