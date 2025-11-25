// Enhanced Insight Card Component
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HealthInsight } from '../types';
import { COLORS } from '../utils/constants';

interface InsightCardProps {
  insight: HealthInsight;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const getBackgroundColor = () => {
    switch (insight.type) {
      case 'critical':
        return '#fee2e2';
      case 'warning':
        return '#fef3c7';
      case 'success':
        return '#d1fae5';
      case 'info':
        return '#dbeafe';
      default:
        return COLORS.gray[100];
    }
  };

  const getBorderColor = () => {
    switch (insight.type) {
      case 'critical':
        return COLORS.danger;
      case 'warning':
        return COLORS.warning;
      case 'success':
        return COLORS.success;
      case 'info':
        return COLORS.info;
      default:
        return COLORS.gray[300];
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: getBackgroundColor(),
          borderLeftColor: getBorderColor(),
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.icon}>{insight.icon}</Text>
        <View style={styles.headerText}>
          <Text style={styles.title}>{insight.title}</Text>
          <Text style={styles.time}>{insight.time}</Text>
        </View>
      </View>
      <Text style={styles.message}>{insight.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray[800],
  },
  time: {
    fontSize: 11,
    color: COLORS.gray[500],
    marginTop: 2,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.gray[700],
  },
});

export default InsightCard;