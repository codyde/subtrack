import React, { useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Animated, 
  Alert,
  Image 
} from 'react-native';
import { router } from 'expo-router';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { CreditCard as Edit2, Trash2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Subscription } from '@/types/subscription';
import { useSubscription } from '@/contexts/SubscriptionContext';

type SubscriptionCardProps = {
  subscription: Subscription;
};

export default function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const { deleteSubscription } = useSubscription();
  const swipeableRef = useRef<Swipeable>(null);

  // Format billing date to display day and month
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short'
  }).format(subscription.billingDate);

  // Define category color
  const categoryColor = Colors.categories[subscription.category] || Colors.gray[500];

  const handleEdit = () => {
    swipeableRef.current?.close();
    router.push(`/subscription/edit/${subscription.id}`);
  };

  const handleDelete = () => {
    swipeableRef.current?.close();
    Alert.alert(
      "Delete Subscription",
      `Are you sure you want to delete ${subscription.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => deleteSubscription(subscription.id)
        }
      ]
    );
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.rightActions}>
        <Animated.View 
          style={[
            styles.actionButton, 
            styles.editButton,
            { transform: [{ translateX: trans }] }
          ]}
        >
          <TouchableOpacity onPress={handleEdit}>
            <Edit2 size={20} color="white" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View 
          style={[
            styles.actionButton, 
            styles.deleteButton,
            { transform: [{ translateX: trans }] }
          ]}
        >
          <TouchableOpacity onPress={handleDelete}>
            <Trash2 size={20} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      friction={2}
      rightThreshold={40}
    >
      <TouchableOpacity 
        style={styles.container}
        onPress={() => router.push(`/subscription/${subscription.id}`)}
        activeOpacity={0.7}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            {/* Placeholder logo - in a real app would use subscription.logo */}
            <View style={[styles.logoPlaceholder, { backgroundColor: categoryColor }]}>
              <Text style={styles.logoText}>{subscription.name.charAt(0)}</Text>
            </View>
          </View>
          
          <View style={styles.details}>
            <Text style={styles.name}>{subscription.name}</Text>
            <View style={styles.categoryContainer}>
              <View style={[styles.categoryDot, { backgroundColor: categoryColor }]} />
              <Text style={styles.category}>
                {subscription.category.charAt(0).toUpperCase() + subscription.category.slice(1)}
              </Text>
            </View>
          </View>
          
          <View style={styles.paymentInfo}>
            <Text style={styles.amount}>${subscription.amount.toFixed(2)}</Text>
            <Text style={styles.billingDate}>{formattedDate}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  logoContainer: {
    marginRight: 16,
  },
  logoPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Inter-Medium',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginBottom: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  category: {
    fontSize: 14,
    color: Colors.gray[600],
    fontFamily: 'Inter-Regular',
  },
  paymentInfo: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.text,
    marginBottom: 4,
  },
  billingDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.gray[600],
  },
  rightActions: {
    flexDirection: 'row',
    width: 120,
    height: '100%',
  },
  actionButton: {
    width: 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: Colors.secondary,
  },
  deleteButton: {
    backgroundColor: Colors.error,
  },
});