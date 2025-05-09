import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import Colors from '@/constants/Colors';
import { useSubscription } from '@/contexts/SubscriptionContext';
import SubscriptionCard from '@/components/SubscriptionCard';
import CategoryBreakdown from '@/components/CategoryBreakdown';
import MonthlySpendingChart from '@/components/MonthlySpendingChart';

// Sample data for the spending chart
const spendingData = [
  { month: 'Jun', amount: 70 },
  { month: 'Jul', amount: 75 },
  { month: 'Aug', amount: 85 },
  { month: 'Sep', amount: 95 },
  { month: 'Oct', amount: 110 },
  { month: 'Nov', amount: 107 },
];

export default function OverviewScreen() {
  const { subscriptions, getMonthlyTotal } = useSubscription();

  // Sort subscriptions by billing date
  const sortedSubscriptions = [...subscriptions].sort(
    (a, b) => a.billingDate.getTime() - b.billingDate.getTime()
  );

  const monthlyTotal = getMonthlyTotal();
  
  // Get current month name
  const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date());

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello!</Text>
          <Text style={styles.subtitle}>Here's your subscription overview</Text>
        </View>

        <View style={styles.monthlyTotal}>
          <Text style={styles.monthlyTotalLabel}>{currentMonth} Total</Text>
          <Text style={styles.monthlyTotalAmount}>${monthlyTotal.toFixed(2)}</Text>
        </View>

        <MonthlySpendingChart data={spendingData} />
        
        <CategoryBreakdown />

        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Upcoming Subscriptions</Text>
        </View>

        <View style={styles.subscriptionList}>
          {sortedSubscriptions.map(subscription => (
            <SubscriptionCard 
              key={subscription.id} 
              subscription={subscription} 
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    marginTop: 40,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[600],
  },
  monthlyTotal: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  monthlyTotalLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  monthlyTotalAmount: {
    fontSize: 36,
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
  },
  subscriptionList: {
    marginBottom: 100, // Added extra margin to account for the tab bar
  },
});