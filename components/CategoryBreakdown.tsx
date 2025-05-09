import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Category } from '@/types/subscription';

export default function CategoryBreakdown() {
  const { subscriptions, getMonthlyTotal, getCategoryTotal } = useSubscription();
  
  // Get all unique categories from subscriptions
  const categories = Array.from(
    new Set(subscriptions.map(sub => sub.category))
  ) as Category[];
  
  const totalMonthly = getMonthlyTotal();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Category Breakdown</Text>
      
      {categories.map(category => {
        const categoryTotal = getCategoryTotal(category);
        const percentage = totalMonthly > 0 
          ? (categoryTotal / totalMonthly) * 100 
          : 0;
        
        return (
          <View key={category} style={styles.categoryRow}>
            <View style={styles.categoryInfo}>
              <View style={[styles.categoryDot, { backgroundColor: Colors.categories[category] }]} />
              <Text style={styles.categoryName}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </View>
            
            <View style={styles.valueSection}>
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { 
                      width: `${percentage}%`,
                      backgroundColor: Colors.categories[category]
                    }
                  ]} 
                />
              </View>
              <Text style={styles.amountText}>${categoryTotal.toFixed(2)}</Text>
            </View>
          </View>
        );
      })}
      
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalAmount}>${totalMonthly.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginBottom: 16,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
  },
  categoryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[700],
  },
  valueSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: Colors.gray[200],
    borderRadius: 4,
    flex: 1,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  amountText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.text,
    width: 60,
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
    marginTop: 8,
  },
  totalText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
  },
  totalAmount: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.primary,
  },
});