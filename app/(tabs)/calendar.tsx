import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { useSubscription } from '@/contexts/SubscriptionContext';
import SubscriptionCard from '@/components/SubscriptionCard';
import Colors from '@/constants/Colors';

export default function CalendarScreen() {
  const { subscriptions } = useSubscription();
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Function to check if a subscription's billing date is on the selected date
  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };
  
  // Filter subscriptions for the selected date
  const subscriptionsForSelectedDate = subscriptions.filter(subscription => 
    isSameDate(subscription.billingDate, selectedDate)
  );
  
  // Calculate total amount for selected date
  const totalForSelectedDate = subscriptionsForSelectedDate.reduce(
    (total, subscription) => total + subscription.amount, 
    0
  );

  // Format date for display
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(selectedDate);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calendarContainer}>
        <Text style={styles.headerTitle}>Calendar</Text>
        <CalendarStrip
          style={styles.calendar}
          calendarHeaderStyle={styles.calendarHeader}
          dateNumberStyle={styles.dateNumber}
          dateNameStyle={styles.dateName}
          highlightDateNumberStyle={styles.highlightDateNumber}
          highlightDateNameStyle={styles.highlightDateName}
          iconContainer={{ flex: 0.1 }}
          onDateSelected={date => setSelectedDate(date.toDate())}
          selectedDate={selectedDate}
          startingDate={new Date()}
          useIsoWeekday={false}
          scrollable
          highlightDateContainerStyle={styles.highlightDateContainer}
        />
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.selectedDateHeader}>
          <Text style={styles.selectedDate}>{formattedDate}</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Total</Text>
            <Text style={styles.amountValue}>
              ${totalForSelectedDate.toFixed(2)}
            </Text>
          </View>
        </View>
        
        {subscriptionsForSelectedDate.length > 0 ? (
          <View style={styles.subscriptionList}>
            {subscriptionsForSelectedDate.map(subscription => (
              <SubscriptionCard 
                key={subscription.id} 
                subscription={subscription} 
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No subscriptions due on this date
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  calendarContainer: {
    backgroundColor: 'white',
    paddingTop: 40,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    zIndex: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginBottom: 16,
    marginLeft: 16,
  },
  calendar: {
    height: 100,
    paddingBottom: 10,
  },
  calendarHeader: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.text,
  },
  dateNumber: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.text,
  },
  dateName: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[600],
  },
  highlightDateContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  highlightDateNumber: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
  },
  highlightDateName: {
    color: 'white',
    fontFamily: 'Inter-Regular',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  selectedDateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  selectedDate: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amountLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[600],
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.primary,
  },
  subscriptionList: {
    paddingBottom: 80,
  },
  emptyState: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[600],
    textAlign: 'center',
  },
});