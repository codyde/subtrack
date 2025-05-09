import React from 'react';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <SubscriptionProvider>
      {children}
    </SubscriptionProvider>
  );
}